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
        this.extract = data?.extract?.length ? data.extract : title();
    }

    static from(...args) {
        return new ArticleData(...args);
    }

    /// Splits the provided string into words and tries to make all characters typeable.
    ///
    /// [>] text: String
    /// [<] Array<String*>
    get tokenized_extract() {
        return this.extract
                   // Remove Trailing Whitespace
                   .replace(/(\s*|\n)$/, String())
                   // Replace Whitespace
                   .replace(/\s+/g, "\x20")
                   // Replace Fraction Slash ( ⁄ )
                   .replace(/[\u2044]/, "\x2F")
                   // Replace Hyphens ( ‐ ‑ ‒ – — ― − )
                   .replace(/[\u2010-\u2015\u2212]/g, "\x2D")
                   // Replace Single Quotation Marks ( ‘ ’ ‚ ‛ )
                   .replace(/[\u2018-\u201B]/g, "\x27")
                   // Replace Double Quotation Marks ( “ ” „ ‟ )
                   .replace(/[\u201C-\u201F]/g, "\x22")
                   // Remove Combining Acute Accent ( ◌́ )
                   .replace(/\u0301/, String())
                   // Split text into words
                   .match(/[^\s]+\s{0,1}/g);
    }
}

void new class Article extends Controller {
    __data() {
        this.$node = ƒ("article");
        this.$article = ƒ("#articleContentWrapper");
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
    }

    unload_article() {
        if (!this.current_article_data)
            return;

        // Create image clone for history.
        º.emit`article :beforeUnload`(this.$thumbnail);

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
        const invert = () => (Math.random() > .5 ? 1 : -1);

        const main_padding = º.req`theme :valAsPx`("__mainPadding");
        const { x, y, width: w, height: h } = this.$node.getBoundingClientRect();
        const ref = {
            left: main_padding,
            top: y + main_padding,
            width: w - main_padding * 2,
            height: h - main_padding * 2,
        };

        const article_base_width = º.req`theme :valAsPx`("__articleBaseWidth");
        const article_width_shift = º.req`theme :valAsPx`("__articleWidthShift");
        const article_base_height = º.req`theme :valAsPx`("__articleBaseHeight");
        const article_height_shift = º.req`theme :valAsPx`("__articleHeightShift");

        const width = Math.round(Math.min(
            article_base_width +
            Math.random() * (invert() * article_width_shift),
            ref.width
        ));
        const height = Math.round(Math.min(
            article_base_height +
            Math.random() * (invert() * article_height_shift),
            ref.height
        ));
        const left = Math.round(
            (ref.width - width) / 2 +
            (invert() * ((ref.width - width) / 2) * Math.random())
        );
        const top = Math.round(
            (ref.height - height) / 2 +
            (invert() * ((ref.height - height) / 2) * Math.random())
        );

        º.emit`theme :apply`({
            __kArticleFrameX: `${ref.left + left}px`,
            __kArticleFrameY: `${ref.top + top}px`,
            __kArticleFrameW: `${width}px`,
            __kArticleFrameH: `${height}px`,
        });
    }

    /// Focuses the input element if it's not the active element.
    ///
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
        const input_txt = this.$input.textContent.replace(/\u00A0/g, "\x20");
        const token_txt = this.$active_token.dataset.word;

        // Don't update on composing keys as it will show up as mistyped text.
        // However if there is already mistyped text then add it to it, otherwise it
        // will appear in front of it.
        if (e.inputType === "insertCompositionText" && !this.$input.dataset.mistyped.length)
            return;

        if (!token_txt)
            return this.clear_input();

        let upcoming_txt = String();
        let mistyped_txt = String();

        if (token_txt.indexOf(input_txt) === 0) {
            if (token_txt.length === input_txt.length) {
                this.advance_token();
                this.clear_input();
                return;
            }

            upcoming_txt = token_txt.substr(input_txt.length);
        } else {
            for (let i = 0; i < input_txt.length; ++i) {
                if (input_txt[i] !== token_txt[i]) {
                    upcoming_txt += token_txt.substr(i);
                    mistyped_txt = input_txt.substr(i);
                    break;
                }
            }
        }

        this.$input.dataset.mistyped = mistyped_txt;
        this.$active_token.dataset.upcoming = upcoming_txt;
    }
}