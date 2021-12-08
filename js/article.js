class InputData {
    constructor(string) {
        this.data = string;
        this.idx = 0;
    }

    static new (...args) {
        return new InputData(...args);
    }

    get char() {
        return this.data[this.idx];
    }

    set char(c) {
        const [before, after] = [this.data.substr(0, this.idx), this.data.substr(this.idx + 1)];
        this.data = before + c + after;
    }

    get len() {
        return this.data.length;
    }

    peek(chars = 1) {
        return this.data.substr(this.idx + 1, chars);
    }

    eat(chars = 1) {
        this.idx += chars;
    }
}

class InputState {
    constructor(token, input) {
        this.token = InputData.new(token);
        this.input = InputData.new(input);

        this.correct = String();
        this.upcoming = String();
        this.mistyped = String();
    }

    static new(...args) {
        return new InputState(...args);
    }

    compare() {
        for (;this.token.idx < this.token.len;) {
            if (!this.input.char) {
                this.upcoming = this.token.data.substr(this.token.idx);
                break;
            }

            if (this.token.char !== this.input.char) {
                const corrected = this.autocorrect();
                if (!(corrected ^ InputState.NOT_CORRECTED)) {
                    this.upcoming = this.token.data.substr(this.token.idx);
                    this.mistyped = this.input.data.substr(this.input.idx);
                    return false;
                } else if (!(corrected ^ InputState.RETRY)) {
                    continue;
                }
            }

            ++this.token.idx;
            ++this.input.idx;
        }

        this.correct = this.token.data.substr(0, this.token.idx);

        return this.correct === this.token.data;
    }

    autocorrect(state) {
        const token_c = this.token.char;
        const input_c = this.input.char;

        for (;;) {
            // Combining Acute Accent
            if ("\u0301" === token_c) {
                this.token.eat();
                return InputState.RETRY;
            }

            // Hyphens
            // U+2010 Hyphen
            // U+2011 Non-Breaking Hyphen
            // U+2012 Figure Dash
            // U+2013 En Dash
            // U+2014 Em Dash
            // U+2015 Horizontal Bar
            // U+2212 Minus Sign
            if (/[\u2010-\u2015\u2212]/.test(token_c) && /[-–—]/.test(input_c))
                break;

            // Single Quotation Marks
            // U+2018 Left Single Quotation Mark
            // U+2019 Right Single Quotation Mark
            // U+201A Single Low-9 Quotation Mark
            // U+201B Single High-Reversed-9 Quotation Mark
            // U+2032 Prime
            if (/[\u2018-\u201B\u2032]/.test(token_c) && /["'‘]/.test(input_c))
                break;

            // Double Quotation Marks
            // U+201C Left Double Quotation Mark
            // U+201D Right Double Quotation Mark
            // U+201E Double Low-9 Quotation Mar
            // U+201F Double High-Reversed-9 Quotation Mark
            // U+2033 Double Prime
            if (/[\u201C-\u201F\u2033]/.test(token_c) && /["']/.test(input_c))
                break;

            // Sharp S
            // U+00DF Latin Small Letter Sharp S
            // U+1E9E Latin Capital Letter Sharp S
            if (/[\u00DF\u1E9E]/.test(token_c) && /^(ss|ß)$/.test(input_c + this.input.peek())) {
                this.input.eat();
                break;
            }

            // Whitespace & Zero Width Space
            // U+200B Zero Width Space (ZWSP)
            if (/\s|\u200B/.test(token_c) && /\s/.test(input_c))
                break;


            // Fractions
            // U+2044 Fraction Slash
            if (/[\u2044]/.test(token_c) && '/' === input_c)
                break;

            if (/\d+\u2044\d*/.test(token_c.normalize("NFKD"))) {
                const fraction = token_c.normalize("NFKD").replace("\u2044", "/");
                const user_input = input_c + this.input.peek(fraction.length - 1);

                if (fraction === user_input) {
                    this.input.eat(fraction.length - 1);
                    break;
                }
            }

            // Normalization
            // Superscripts and Subscripts
            if (token_c.normalize("NFKD") === input_c)
                if (token_c.normalize("NFKD").length === input_c.length)
                    break;

            return InputState.NOT_CORRECTED;
        }

        return InputState.CORRECTED;
    }
}

InputState.CORRECTED = 1 << 0;
InputState.NOT_CORRECTED = 1 << 1;
InputState.RETRY = 1 << 2;

class ArticleData {
    constructor(data) {
        this._raw = data;

        this.id = data?.pageid;
        this.url = data?.content_urls?.desktop?.page;
        this.edit_url = data?.content_urls?.desktop?.edit;
        this.thumbnail = data?.thumbnail?.source;
        this.image = data?.originalimage;
        this.title = data?.titles?.normalized;
        this.lang = data?.lang;
        this.extract = data?.extract?.length ? data.extract : this.title;
    }

    static from(...args) {
        return new ArticleData(...args);
    }

    /// Splits the provided string into words.
    ///
    /// [>] text: String
    /// [<] Array<String*>
    get tokenized_extract() {
        return this.extract.trim().replace(/\n/g, "\x20").match(/[^\s]+\s{0,1}/g);
    }
}

void new class Article extends Controller {
    __data() {
        this.$node = ƒ("article");
        this.$article = ƒ("#article");
        this.$extract = ƒ("#articleExtract");
        this.$thumbnail = ƒ("#articleThumbnail");
        this.$image = ƒ("#articleImage");
        this.$active_token = null;
        this.$input = ª(ƒ("#inputTokenTemplate"), ".inputToken").cloneNode();

        this.current_article_data = null;
    }

    __listen() {
        return {
            "article :setContents": this.set_contents.bind(this),
            "theme :afterUpdate": this.reposition_article.bind(this),
            "input :clear": this.clear_input.bind(this),
        };
    }

    __shortcuts() {
        return {
            "enter": () => {
                const url = this.current_article_data.url;
                if (url)
                    window.open(url);
            },
            "cmd enter": () => {
                const url = this.current_article_data.edit_url;
                if (url)
                    window.open(url);
            },
            "tab": {
                keydown: e => (this.display_highres_image(true), e.preventDefault()),
                keyup: e => (this.display_highres_image(false), e.preventDefault()),
            },
            "cmd s": e => {
                if (this.current_article_data) {
                    this.advance_token();
                    º.emit`input :clear`();
                }
            },
            "cmd x": () => this.current_article_data && this.unload_article(),
        };
    }

    __init() {
        // Always start in a loading state.
        º.emit`spinner :spawn`(this.$article);
        this.$node.dataset.isLoaded = false;

        this.reposition_article();

        window.addEventListener("resize", () => this.reposition_article());

        this.$input.addEventListener("input", this.input_evt.bind(this));
        document.body.addEventListener("keydown", this.focus_input.bind(this));
    }

    display_highres_image(should_render) {
        const id = this.current_article_data.id;
        const image = this.current_article_data.image;

        // Remove source if it shouldn't be rendered.
        if (!should_render)
            return void (this.$image.src = "data:,");

        // If there is no current article loaded or
        // the highres image is already set return.
        if (!this.current_article_data || !image || this.$image.src !== "data:,")
            return;

        // Display the scaled up thumbnail while waiting for the highres version.
        this.$image.src = this.current_article_data.thumbnail;
        this.$image.style.cssText = `--original-height: ${image.width}px;
                                         --original-width: ${image.height}px;`;

        preload_image(image.source, img => {
            // If, while the image has been loaded, the article got changed ignore
            // the incoming highres image.
            if (!this.current_article_data
                || this.current_article_data.id !== id
                || this.$image.src === "data:,")
                return;

            this.$image.src = img.src;
        });
    }

    set_contents(article_data_raw) {
        // If there is already an article loaded clear it first.
        if (this.current_article_data)
            this.unload_article();

        const article = this.current_article_data = ArticleData.from(article_data_raw);

        // Create tokens.
        article.tokenized_extract.forEach((word, i) => {
            const token_node = ª(ƒ("#tokenTemplate"), ".token");
            token_node.dataset.word = word;
            token_node.classList.add("upcomingToken");
            this.$extract.appendChild(token_node);
        });

        // Set active token.
        this.advance_token();

        // Insert thumbnail.
        if (article.thumbnail) {
            preload_image(article.thumbnail, img => {
                // Make sure that the article hasn't been changed.
                if (article.id === this.current_article_data?.id)
                    this.$thumbnail.src = img.src;
            });
        }

        º.emit`spinner :kill`(this.$article);
        this.$node.dataset.isLoaded = true;

        º.emit`article :loaded`();
    }

    unload_article() {
        if (!this.current_article_data)
            return;

        º.emit`article :beforeUnload`(this.current_article_data, this.$thumbnail);

        // Clear input
        º.emit`input :clear`();

        // Reset all article nodes.
        this.$extract.querySelectorAll("span").forEach((node) => node.remove());
        this.$image.src = "data:,";
        this.$thumbnail.src = "data:,";
        this.$active_token = null;

        // Reposition frame.
        this.reposition_article();

        º.emit`spinner :spawn`(this.$article);
        º.emit`article :afterUnload`(this.current_article_data);

        this.current_article_data = undefined;
        this.$node.dataset.isLoaded = false;
    }

    advance_token() {
        const active_token = this.$active_token;
        const next_token = active_token ? active_token?.nextElementSibling
                                        : this.$extract.children[0];

        if (active_token) {
            if (!next_token) {
                this.unload_article();
                return;
            }

            // Removed typed row.
            if (active_token.offsetTop !== next_token.offsetTop) {
                while(next_token.previousElementSibling !== null)
                    next_token.previousElementSibling.remove();
            }

            // Update typed token.
            active_token.classList.remove("activeToken");
            active_token.classList.add("typedToken");
        }

        // Set next token.
        next_token.classList.remove("upcomingToken");
        next_token.classList.add("activeToken");
        next_token.dataset.upcoming = next_token.dataset.word;
        next_token.appendChild(this.$input);

        // Store reference.
        this.$active_token = next_token;
    }

    reposition_article() {
        const maybe_invert = () => (Math.random() > .5 ? 1 : -1);

        const main_padding = º.req`theme :valAsPx`("__mainPadding");
        let {
            x: ref_x, y: ref_y,
            width: ref_width, height: ref_height,
        } = this.$node.getBoundingClientRect();
        ref_x += main_padding;
        ref_width -= main_padding * 2;

        const article_base_width = º.req`theme :valAsPx`("__articleBaseWidth");
        const article_width_shift = º.req`theme :valAsPx`("__articleWidthShift");
        const article_base_height = º.req`theme :valAsPx`("__articleBaseHeight");
        const article_height_shift = º.req`theme :valAsPx`("__articleHeightShift");

        const width = Math.round(Math.min(
            article_base_width + Math.random() * (maybe_invert() * article_width_shift),
            ref_width
        ));
        const height = Math.round(Math.min(
            article_base_height + Math.random() * (maybe_invert() * article_height_shift),
            ref_height
        ));
        const left = Math.round(
            (ref_width - width) / 2 +
            (maybe_invert() * ((ref_width - width) / 2) * Math.random())
        );
        const top = Math.round(
            (ref_height - height) / 2 +
            (maybe_invert() * ((ref_height - height) / 2) * Math.random())
        );

        º.emit`theme :apply`({
            __kArticleFrameX: `${ref_x + left}px`,
            __kArticleFrameY: `${ref_y + top}px`,
            __kArticleFrameW: `${width}px`,
            __kArticleFrameH: `${height}px`,
        });
    }

    /// Focuses the input element if it's not the active element.
    ///
    /// [~] TODO: Make sure that the input gets properly focused on the focus event.
    /// [<] void
    focus_input() {
        if (document.activeElement !== this.$input) {
            const range = document.createRange();
            const selection = window.getSelection();

            this.$input.focus();
            range.selectNodeContents(this.$input);
            range.collapse(false);
            selection.empty();
            selection.addRange(range);
        }
    }

    /// Clears all data from the input element.
    ///
    /// [<] void
    clear_input() {
        this.$input.textContent = String();
        this.$input.dataset.mistyped = String();
    }

    input_evt(e) {
        const input_txt = this.$input.textContent;
        const token_txt = this.$active_token.dataset.word;

        // Don't update on composing keys as it will show up as mistyped text.
        // However if there is already mistyped text then add it to it, otherwise it
        // will appear in front of it.
        if (e.inputType === "insertCompositionText" && !this.$input.dataset.mistyped.length)
            return;

        if (!token_txt)
            return this.clear_input();

        const state = InputState.new(token_txt, input_txt);
        if (state.compare()) {
            º.emit`article :completedToken`(input_txt);
            this.advance_token();
            this.clear_input();
            return;
        }

        if (state.correct) {
            this.$input.textContent = state.correct + state.mistyped;
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(this.$input);
            range.collapse(false);
            selection.empty();
            selection.addRange(range);
        }
        this.$input.dataset.mistyped = state.mistyped;
        this.$active_token.dataset.upcoming = state.upcoming;
    }
}