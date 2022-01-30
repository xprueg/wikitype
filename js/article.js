class ArticleData {
    constructor(data) {
        this.wikiapi_response = data;

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
            "cmd s": e => {
                if (this.current_article_data) {
                    this.advance_token();
                    emit`input :clear`();
                }
            },
            "cmd x": () => this.current_article_data && this.unload_article(),
        };
    }

    __init() {
        // Always start in a loading state.
        emit`spinner :spawn`(this.$article);
        this.$node.dataset.isLoaded = false;

        this.reposition_article();

        window.addEventListener("resize", () => this.reposition_article());

        this.$input.addEventListener("input", this.input_evt.bind(this));
        document.body.addEventListener("keydown", this.focus_input.bind(this));
    }

    set_contents(wikiapi_response) {
        // If there is already an article loaded clear it first.
        if (this.current_article_data)
            this.unload_article();

        const article = this.current_article_data = ArticleData.from(wikiapi_response);

        // Create tokens.
        article.tokenized_extract.forEach((word, i) => {
            const token_node = ª(ƒ("#tokenTemplate"), ".token");
            token_node.dataset.word = word;
            token_node.classList.add("upcomingToken");
            this.$extract.appendChild(token_node);
        });

        // Set active token.
        this.advance_token();

        emit`spinner :kill`(this.$article);
        this.$node.dataset.isLoaded = true;

        emit`article :loaded`();
    }

    unload_article() {
        if (!this.current_article_data)
            return;

        emit`article :beforeUnload`(this.current_article_data);

        // Clear input
        emit`input :clear`();

        // Reset all article nodes.
        this.$extract.querySelectorAll("span").forEach((node) => node.remove());
        this.$active_token = null;

        // Reposition frame.
        this.reposition_article();

        emit`spinner :spawn`(this.$article);
        emit`article :afterUnload`(this.current_article_data);

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
            if (active_token.offsetTop !== next_token.offsetTop)
                while(next_token.previousElementSibling !== null)
                    next_token.previousElementSibling.remove();

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

        const main_padding = req`theme :valAsPx`("__mainPadding");
        const max_lines = +req`theme :val`("__articleLimitTokenLines");
        const randomize_position = req`theme :bool`("__articleRandomizePosition");
        const article_base_width = req`theme :valAsPx`("__articleBaseWidth");
        const article_width_shift = req`theme :valAsPx`("__articleWidthShift");
        let article_base_height = req`theme :valAsPx`("__articleBaseHeight");
        const article_height_shift = req`theme :valAsPx`("__articleHeightShift");

        if (max_lines !== 0) {
            const article_padding = req`theme :valAsPx`("__articlePadding");
            const size_ref = document.createElement("span");
            size_ref.classList.add("token");
            size_ref.style.opacity = "0%";
            size_ref.textContent = "x";
            this.$extract.appendChild(size_ref);
            const m_height = size_ref.getBoundingClientRect().height * max_lines;
            size_ref.remove();
            article_base_height = m_height + article_padding * 2;
        }

        let {
            x: ref_x, y: ref_y,
            width: ref_width, height: ref_height,
        } = this.$node.getBoundingClientRect();
        ref_x += main_padding;
        ref_width -= main_padding * 2;

        const width = Math.round(Math.min(
            article_base_width + Math.random() * (maybe_invert() * article_width_shift),
            ref_width
        ));
        const height = Math.round(Math.min(
            article_base_height + Math.random() * (maybe_invert() * article_height_shift),
            ref_height
        ));
        let left = Math.round((ref_width - width) / 2);
        let top = Math.round((ref_height - height) / 2);
        if (randomize_position) {
            left += (maybe_invert() * ((ref_width - width) / 2) * Math.random());
            top += (maybe_invert() * ((ref_height - height) / 2) * Math.random());
        }

        emit`theme :apply`({
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
            emit`article :completedToken`(input_txt);
            this.advance_token();
            this.clear_input();
            return;
        }

        this.$input.textContent = state.correct + state.mistyped;
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(this.$input);
        range.collapse(false);
        selection.empty();
        selection.addRange(range);

        this.$input.dataset.mistyped = state.mistyped;
        this.$active_token.dataset.upcoming = state.upcoming;
    }
}