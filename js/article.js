void function ArticleController() {
    const self = Object.create(null);

    void function init() {
        self.article = ª(ƒ("#articleTemplate"), "#article");
        ƒ("main").appendChild(self.article);
        self.areas = º.req`areas::get`();
        self.current_article = undefined;

        º.respond({
            "article::get_active_token_text": () => {
                return ƒ(".active-token", self.article)?.dataset?.word;
            },
            "article::getUrl": () => {
                return self.current_article?.content_urls?.desktop?.page;
            },
        });

        º.listen({
            "article::advance_token": () => advance_token(),
            "article::set_token_upcoming_text": (upcoming_txt) => {
                ƒ(".progress-token", self.article).dataset.upcoming = upcoming_txt;

                if (upcoming_txt === String())
                    advance_token();
            },
            "article::set_token_mistyped_text": (mistyped_txt) => {
                ƒ(".progress-token", self.article).dataset.mistyped = mistyped_txt;
            },
            "article::loadRandom": () => load_random(),
            "article::set_contents": (...args) => set_contents(...args),
            "article::unloadArticle": () => unload_article(),
            "article::showHighResImage": (show) => {
                const img = ƒ("img", self.article);

                if (show) {
                    if (img.dataset.display === "highres")
                        return;

                    img.dataset.lowres = img.src;
                    const width = self.current_article?.originalimage?.width ?? img.naturalWidth;
                    const height = self.current_article?.originalimage?.height ?? img.naturalHeight;

                    const preload = new Image();
                    preload.onload = (e) => img.src = e.target.src;
                    preload.src = self.current_article?.originalimage?.source,

                    img.dataset.display = "highres";
                    img.style.cssText = `--original-height: ${width}px;
                                         --original-width: ${height}px;`;
                } else {
                    img.dataset.display = "lowres";
                    img.src = img.dataset.lowres;
                }
            },
        });
    }();

    function tokenize(text) {
        const words = text
            .replace(/\n$/, String())
            .match(/[^\s]+\s{0,1}/g)
            .map(word => word
                .replace(/\s+/g, "\x20")  // Whitespace
                .replace(/[\u2010-\u2015\u2212]/g, "\x2D")  // Dashes
                .replace(/[\u2018-\u201B]/g, "\x27")  // Single quotation marks
                .replace(/[\u201C-\u201F]/g, "\x22")  // Double quotation marks
                .replace(/\u0301/, String()) // Combining Acute Accent
            );

        if (words === null)
            throw Error("Error splitting extract.");

        return words.map((word, idx) => {
            const token = document.createElement("span");
            token.classList.add("token");
            token.dataset.word = word;

            return token;
        });
    }

    function unload_article() {
        const img = ƒ("body").appendChild(ƒ("img", self.article).cloneNode());

        if (img.src !== String()) {
            const img_pos = ƒ("img", self.article).getBoundingClientRect();
            const padding = 0; //self.areas.footer.h / 2;
            const top = img_pos.y;
            const left = img_pos.x;

            img.classList.add("footer-image");
            img.style.left = `${left}px`;
            img.style.top = `${top}px`;

            setTimeout(() => {
                img.style.left = `${Math.floor(Math.random() * (self.areas.footer.w - padding))}px`;
                img.style.top = `${
                    window.innerHeight - self.areas.footer.h - º.req`theme::px`("--global-border-size")
                }px`;
                img.style.transform = `rotate(${Math.random() > .5 ? "-" : ""}${Math.random() * 360}deg)`;
            });
        }

        ƒ("p", self.article).innerHTML = String();
        ƒ("img", self.article).removeAttribute("src");

        º.emit`nav::displayOptions`(self.current_article);
        self.current_article = undefined;
        º.emit`spinner::spawn`(self.article);
    }

    function set_contents(data, is_related) {
        º.emit`spinner::kill`(self.article);

        self.current_article = data;

        tokenize(data.extract.length ? data.extract : data.displaytitle).forEach((token) => ƒ("#articleExtract", self.article).appendChild(token));
        advance_token();

        self.article.dataset.title = data.displaytitle;
        self.article.dataset.canonicalTitle = data.titles.canonical;
        self.article.dataset.lang = data.lang;
        if (data?.thumbnail?.source)
            ƒ("#articleImage", self.article).src = data?.thumbnail?.source;

        º.emit`history::push`({ title: data.titles.normalized, is_related });
    }

    // TODO: Handle lang selection.
    function load_random() {
        º.emit`spinner::spawn`(self.article);
        º.req`wikiapi::fetchRandomArticle`()
            .then((data) =>
                set_contents(data, false))
            .catch((err) => {
                // TODO: Handle error.
                console.log(err);
            });
    }

    function advance_token() {
        const active_token = ƒ(".active-token", self.article);
        const next_token = active_token?.nextElementSibling
                           ?? ƒ(".token:first-child", self.article);

        // Unload article
        if (next_token.classList.contains("typed-token") || active_token === next_token)
            return void unload_article();

        // Scroll article up
        if (active_token && active_token.offsetTop !== next_token.offsetTop) {
            while(next_token.previousElementSibling !== null) {
                next_token.previousElementSibling.remove();
            }
        }

        // Reset previous token
        active_token?.classList.remove("active-token");
        active_token?.classList.add("typed-token");
        active_token?.querySelector(".progress-token").remove();

        // Set next token
        const progress_token = document.createElement("span");
        progress_token.classList.add("progress-token");
        progress_token.dataset.upcoming = next_token.dataset.word;
        progress_token.dataset.mistyped = String();

        next_token.appendChild(progress_token);
        next_token.classList.add("active-token");
    }
}();