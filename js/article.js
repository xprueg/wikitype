void function ArticleController() {
    const self = Object.create(null);

    function Article(data) {
        this._raw = data;
        this.pageid = data.pageid;
        this.desktop_url = data?.content_urls?.desktop?.page;
        this.thumbnail = data?.thumbnail;
        this.image = data?.originalimage ?? this.thumbnail;
        this.title = data?.titles?.normalized;
        this.canonical = data?.titles?.canonical;
        this.lang = data?.lang;
        this.extract = data?.extract?.length ? data?.extract : data?.titles?.display;
    }

    void function init() {
        self.article_node = ƒ("#articleContentWrapper");
        self.extract_node = ƒ("#articleExtract");
        self.thumbnail_node = ƒ("#articleThumbnail");
        self.image_node = ƒ("#articleImage");
        self.token_node;
        self.current;

        self.flags = {
            DONT_DISPLAY_NAVIGATION: 1 << 0,
            DISPLAY_NAVIGATION: 1 << 1,
        };

        º.emit`theme :repositionArticle`(self.article_node);
        window.addEventListener(
            "resize",
            () => º.emit`theme :repositionArticle`(self.article_node)
        );

        // Always start in a loading state.
        º.emit`spinner :spawn`(self.article_node);
        º.emit`shortcut :setMultiple`(
            ['enter',
                (e) => {
                    const url = self.current?.desktop_url;
                    if (url)
                        window.open(url);
                }],
            ['tab',
                (e) => (display_highres_image(true), e.preventDefault()),
                (e)  => (display_highres_image(false), e.preventDefault())],
            ['^s',
                (e) => (advance_token(), º.emit`input :clear`())],
            ['^n',
                (e) => {
                    if (!self.current)
                        return;

                    unload_article();
                }],
         );

        º.respond({
            "article :getRawData": () => self.current?._raw,
            "article :getActiveToken": () => self.token_node,
            "article :getActiveTokenText": () => self.token_node?.dataset?.word,
        });

        º.listen({
            "article :advanceToken": () => advance_token(),
            "article :updateProgressToken": (upcoming) => {
                ƒ("#progressToken", self.article).dataset.upcoming = upcoming;
            },
            "article :setContents": (article_data) => set_contents(article_data),
            "article :unloadArticle": () => unload_article(),
            "setting :themeUpdated": () => º.emit`theme :repositionArticle`(self.article_node),
        });
    }();

    /// Splits the provided string into words and tries to make all characters typeable.
    ///
    /// [>] text: String
    /// [<] Array<String*>
    function tokenize(text) {
                   // Removes Trailing Whitespace
        return text.replace(/(\s*|\n)$/, String())

                   // Replaces Whitespace
                   .replace(/\s+/g, "\x20")

                   // Replaces Fraction Slash ( ⁄ )
                   .replace(/[\u2044]/, "\x2F")

                   // Replaces Hyphens ( ‐ ‑ ‒ – — ― − )
                   .replace(/[\u2010-\u2015\u2212]/g, "\x2D")

                   // Replaces Single Quotation Marks ( ‘ ’ ‚ ‛ )
                   .replace(/[\u2018-\u201B]/g, "\x27")

                   // Replaces Double Quotation Marks ( “ ” „ ‟ )
                   .replace(/[\u201C-\u201F]/g, "\x22")

                   // Removes Combining Acute Accent ( ◌́ )
                   .replace(/\u0301/, String())

                   // Split text into words
                   .match(/[^\s]+\s{0,1}/g);
    }

    function display_highres_image(should_render) {
        const pid = self.current?.pageid;
        const image = self.current?.image;

        // Remove source if it shouldn't be rendered.
        if (!should_render)
            return void (self.image_node.src = "data:,");

        // If there is not current article loaded or
        // the highres image is already set return.
        if (!self.current || !image || self.image_node.src !== "data:,")
            return;

        // Display the lowres image, scaled up, while waiting for the highres version.
        self.image_node.src = self.current.thumbnail.source;
        self.image_node.style.cssText = `--original-height: ${image.width}px;
                                         --original-width: ${image.height}px;`;

        π(image.source, (img) => {
            // If, while the image has been loaded, the article got changed ignore
            // the incoming highres image.
            if (!self.current
                || self.current.pageid !== pid
                || self.image_node.src === "data:,")
                return;

            self.image_node.src = img.src;
        });
    }

    function set_contents(article_data) {
        // If there is already an article loaded clear it first.
        if (self.current)
            unload_article(self.flags.DONT_DISPLAY_NAVIGATION);

        const article = self.current = new Article(article_data);

        // Create tokens.
        tokenize(article.extract).forEach((word) => {
            const token_node = ª(ƒ("#tokenTemplate"), ".token");
            token_node.dataset.word = word;
            self.extract_node.appendChild(token_node);
        });

        // Set active token.
        advance_token();

        // Insert thumbnail.
        if (article.thumbnail?.source) {
            π(article.thumbnail.source, (img) => {
                // Make sure that the article hasn't been changed.
                if (article.pageid === self.current?.pageid)
                    self.thumbnail_node.src = img.src;
            });
        }

        º.emit`spinner :kill`(self.article_node);
    }

    function unload_article(display_navigation = self.flags.DISPLAY_NAVIGATION) {
        if (!self.current)
            return;

        // Create image clone for history.
        º.emit`history :cloneImage`(self.thumbnail_node);

        // Clear input
        º.emit`input :clear`();

        // Reset all article nodes.
        self.extract_node.querySelectorAll("span").forEach((node) => node.remove());
        self.image_node.src = "data:,";
        self.thumbnail_node.src = "data:,";
        self.token_node = null;

        // Reposition frame.
        º.emit`theme :repositionArticle`(self.article_node);

        if (display_navigation === self.flags.DISPLAY_NAVIGATION) {
            º.emit`spinner :spawn`(self.article_node);
            º.emit`nav :displayOptions`(self.current._raw);
        }

        self.current = undefined;
    }

    function advance_token() {
        const active_token = self.token_node;
        const next_token = active_token ? active_token?.nextElementSibling
                                        : self.extract_node.children[0];

        if (active_token) {
            if (!next_token) {
                unload_article();
                return;
            }

            // Removed typed row.
            if (active_token.offsetTop !== next_token.offsetTop) {
                while(next_token.previousElementSibling !== null)
                    next_token.previousElementSibling.remove();
            }

            // Reset previous token.
            active_token.removeAttribute("id");
            active_token.classList.add("typedToken");
            active_token.querySelector("#progressToken").remove();
        }

        // Set next token.
        const progress_token = ª(ƒ("#progressTokenTemplate"), "#progressToken");
        progress_token.dataset.upcoming = next_token.dataset.word;
        next_token.appendChild(progress_token);
        next_token.setAttribute("id", "activeToken");

        // Store reference.
        self.token_node = next_token;
        º.emit`article :advancedToken`(self.token_node);
    }
}();

void function InputController() {
    const self = Object.create(null);

    void function init() {
        self.current_key_is_dead = false;
        self.input = articleInput;
        self.input.addEventListener("input", input_evt);

        document.body.addEventListener("keydown", key_event);

        º.listen({
            'input :clear': () => clear_input(),
            'input :focus': () => focus_input(),
        });

        focus_input();
    }();

    function focus_input() {
        if (document.activeElement !== self.input) {
            const range = document.createRange();
            const selection = window.getSelection();

            self.input.focus();
            range.selectNodeContents(self.input);
            range.collapse(false);
            selection.empty();
            selection.addRange(range);
        }
    }

    function clear_input() {
        self.input.textContent = String();
    }

    function key_event(e) {
        const key = e.key;
        self.current_key_is_dead = (key === "Dead");
        focus_input();
    }

    function input_evt(kbevt) {
        const input_txt = self.input.textContent.replace(/\u00A0/g, "\x20");
        const token_txt = º.req`article :getActiveTokenText`();

        // Don't updated on dead key as it will show up as mistyped text.
        if (self.current_key_is_dead)
            return;

        if (!token_txt) {
            º.emit`nav :select`(input_txt);
            clear_input();
            return;
        }

        let upcoming_txt = String();
        let mistyped_txt = String();

        if (token_txt.indexOf(input_txt) === 0) {
            if (token_txt.length === input_txt.length) {
                º.emit`article :advanceToken`();
                clear_input();
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

        self.input.dataset.mistyped = mistyped_txt;
        º.emit`article :updateProgressToken`(upcoming_txt);
    }
}();