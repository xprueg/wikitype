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
        self.article_node = ƒ("#article");
        self.extract_node = ƒ("#articleExtract");
        self.thumbnail_node = ƒ("#articleThumbnail");
        self.image_node = ƒ("#articleImage");
        self.token_node;
        self.current;

        reposition();

        // Always start in a loading state.
        º.emit`spinner :spawn`(self.article_node);

        º.respond({
            "article :getRawData": () => self.current?._raw,
            "article :getActiveTokenText": () => self.token_node?.dataset?.word,
            "article :getUrl": () => self.current?.desktop_url,
        });

        º.listen({
            "article :advanceToken": () => advance_token(),
            "article :updateProgressToken": (upcoming, mistyped) => {
                ƒ("#progressToken", self.article).dataset.upcoming = upcoming;
                ƒ("#progressToken", self.article).dataset.mistyped = mistyped;
            },
            "article :setContents": (article_data) => set_contents(article_data),
            "article :unloadArticle": () => unload_article(),
            "article :showHighResImage": (bool) => display_highres_image(bool),
        });
    }();

    /// Splits the provided string into words and tries to make all characters typeable.
    ///
    /// [>] text: String
    /// [<] Array<String*>
    function tokenize(text) {
        return text.replace(/\n$/, String())
                   .replace(/\s+/g, "\x20")  // Whitespace
                   .replace(/[\u2010-\u2015\u2212]/g, "\x2D")  // Dashes
                   .replace(/[\u2018-\u201B]/g, "\x27")  // Single quotation marks
                   .replace(/[\u201C-\u201F]/g, "\x22")  // Double quotation marks
                   .replace(/\u0301/, String()) // Combining Acute Accent
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
            unload_article();

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
                if (article.pageid === self.current.pageid)
                    self.thumbnail_node.src = img.src;
            });
        }

        º.emit`spinner :kill`(self.article_node);
    }

    function unload_article() {
        if (!self.current)
            return;

        // Create image clone for footer.
        º.emit`history :cloneImage`(self.thumbnail_node);

        // Reset all article nodes.
        self.extract_node.querySelectorAll("span").forEach((node) => node.remove());
        self.image_node.src = "data:,";
        self.thumbnail_node.src = "data:,";
        self.token_node = null;

        // Reposition frame.
        reposition();

        º.emit`spinner :spawn`(self.article_node);
        self.current = undefined;
    }

    function advance_token() {
        const active_token = self.token_node;
        const next_token = active_token ? active_token?.nextElementSibling
                                        : self.extract_node.children[0];

        if (active_token) {
            if (!next_token) {
                º.emit`nav :displayOptions`(self.current._raw);
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
        progress_token.dataset.mistyped = String();
        next_token.appendChild(progress_token);
        next_token.setAttribute("id", "activeToken");

        // Store reference.
        self.token_node = next_token;
    }

    /// Randomly repositions the article frame.
    ///
    /// [<] Void
    function reposition() {
        const rand = (val) => Math.floor(Math.random() * val);
        const areas = º.req`areas::get`();
        const padding = º.req`theme::px`("--main-padding");
        const article_base_width = º.req`theme::px`("--article-base-width");
        const article_width_shift = º.req`theme::px`("--article-width-shift");
        const article_base_height = º.req`theme::px`("--article-base-height");
        const article_height_shift = º.req`theme::px`("--article-height-shift");

        const max_width = areas.main.w - padding * 2;
        const width = Math.min(
            article_base_width + rand((Math.random() > .5 ? 1 : -1) * article_width_shift),
            max_width
        );

        const max_height = areas.main.h - padding * 2;
        const height = Math.min(
            article_base_height + rand((Math.random() > .5 ? 1 : -1) * article_height_shift),
            max_height
        );

        const left = padding + rand(areas.main.w - width - padding * 2);
        const top = padding + rand(areas.main.h - height - padding * 2);

        self.article_node.style.cssText = `
            left: ${left}px; width: ${width}px;
            top: ${top}px;   height: ${height}px;
        `;
    }
}();