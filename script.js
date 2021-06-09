function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');

    ƒ(".clock").innerText = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 1000 * 60);

void function LanguageController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("[langController]");
        self.default_lang = "en";
        self.default_li_node = get_node_by_lang_code(self.default_lang);
        self.state = ƒƒ("[langList] li").reduce(
            (state, li) => Object.assign(state, { [li.dataset.langCode]: false }),
            Object.create(null)
        );

        // Activate default language.
        toggle_lang(self.default_li_node);

        // Add listener.
        ƒ("[langList]", self.node).addEventListener("click", (e) => {
            if (!(e.target instanceof HTMLLIElement))
                return;

            toggle_lang(e.target);
        });

        º.respond({
            "lang::getRandom": () => {
                const languages = get_active_languages();
                return languages[Math.floor(Math.random() * languages.length)];
            },
            "lang::getAll": () => Object.keys(self.state),
        });
    }();

    /// Returns a list containing the selected languages.
    ///
    /// [<] Array<String*>
    function get_active_languages() {
        return Object.keys(self.state).filter((lang) => self.state[lang]);
    }

    /// Returns a node that matches the given language code.
    ///
    /// [>] lang_code :: string
    /// [<] HTMLLIElement
    function get_node_by_lang_code(lang_code) {
        return ƒ(`[data-lang-code=${lang_code}`, self.node);
    }

    /// Toggles the selected status for the given node and sets the internal state.
    /// Activates the default language if the call should have otherwise resulted in no
    /// active languages.
    ///
    /// [>] node :: HTMLLIElement
    /// [<] void
    function toggle_lang(node) {
        const lang_code = node.dataset.langCode;

        self.state[lang_code] = !self.state[lang_code];
        node.classList.toggle("selected-option");

        // Make sure that at least one language is selected.
        if (get_active_languages().length === 0)
            toggle_lang(self.default_li_node);
    }
}();

void function ThemeController() {
    const self = Object.create(null);

    void function init() {
        self.style = getComputedStyle(ƒ("html"));

        º.respond({
            "theme::val": (key) => val(key),
            "theme::px": (key) => px(key),
        });
    }();

    /// Returns the raw property value as a string.
    ///
    /// [>] key :: string
    /// [<] string
    function val(key) {
        return self.style.getPropertyValue(key);
    }

    /// Returns the property as a number.
    ///
    /// [>] key :: string
    /// [<] int
    function px(key) {
        return Number(val(key).replace(/px$/, String()));
    }
}();

void function HistoryController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ(".history");
        self.entries = Array();

        º.listen({
            "history::push": (obj) => {
                self.entries.push(obj);
                push_entry(obj);
            },
        });
    }();

    function push_entry(obj) {
        const item = ª(ƒ("template#history_item"), "li");
console.log(obj);
        if (!obj.is_related)
            item.classList.add("chain_start");

        item.querySelector("span").innerText = obj.title;
        self.node.insertBefore(
            item,
            self.node.children.length ? self.node.children[0] : null
        );
    }
}();

void function areas() {
    let areas = Object.create(null);

    void function init() {
        update_areas();

        window.addEventListener("resize", () => {
           update_areas();
           º.emit`areas::update`(areas);
        });

        º.respond({
            "areas::get": () => areas,
        });
    }();

    function update_areas() {
        const gbs = º.req`theme::px`("--global-border-size");
        const header = ƒ("header").getBoundingClientRect();
        const main = ƒ("main").getBoundingClientRect();
        const footer = ƒ("footer").getBoundingClientRect();

        areas.header = {
            x: header.left + gbs, w: header.width - gbs,
            y: header.top,        h: header.height,
        };

        areas.main = {
            x: main.left + gbs, w: main.width - gbs,
            y: main.top + gbs,  h: main.height - gbs * 2,
        }

        areas.footer = {
            x: footer.left + gbs, w: footer.width - gbs,
            y: footer.top,        h: footer.height,
        }
    }
}();

// insert text frame
// handle inputs

// show loading content
// fetch data - load from wikipedia
// tokenize
// reposition/resize frame
// move image

// call = º.call`message`;
// emit = º.emit`message`;
// listen = º.listen`message`((response) => {});

void function WikiController() {
    const self = Object.create(null);

    void function init() {
        self.related_articles_cache = new Map();
        self.random_article_cache = new Map(º.req`lang::getAll`()
                                             .map((lang) => [lang, Array()]));
        self.url = {
            random: (lang_code) =>
                `https://${lang_code}.wikipedia.org/api/rest_v1/page/random/summary`,
            related: (article_data) => {
                const lang = article_data.lang;
                const title = encodeURIComponent(article_data.titles.normalized);

                return `https://${lang}.wikipedia.org/api/rest_v1/page/related/${title}`;
            }
        }

        º.respond({
            "wikiapi::fetchRandomArticle": (lang_code) => {
                return load_random_article(lang_code);
            },
            "wikiapi::fetchRelatedArticles": (article_data) => {
                return load_related_articles(article_data)
            },
        });

        º.listen({
            "wikiapi::prefetchRelatedArticles": (article_data) => {
                prefetch_related_articles(article_data)
            },
        });
    }();

    function prefetch_related_articles(article_data) {
        load_related_articles(article_data).then(
            (articles) => self.related_articles_cache.set(article_data.pageid,
                                                          articles)
        ).catch((err) => {
            // TODO: Handle error.
            console.dir(err);
        });
    }

    function prefetch_random_article(lang_code) {
        µƒ(self.url.random(lang_code)).then((article_data) => {
            prefetch_related_articles(article_data);
            self.random_article_cache.get(lang_code).push(article_data);
        }).catch((err) => {
            console.log(err);
            // TODO: Handle error.
        });
    }

    function load_related_articles(article_data) {
        const article_id = article_data.pageid;

        const cached_related_articles = self.related_articles_cache.get(article_id)
        if (cached_related_articles) {
            self.related_articles_cache.delete(article_id);
            return µµ(cached_related_articles);
        }

        return µƒ(self.url.related(article_data), { pages: Array() });
    }

    function load_random_article(lang_code = º.req`lang::getRandom`()) {
        prefetch_random_article(lang_code);

        const cached_article = self.random_article_cache.get(lang_code).shift();
        if (cached_article)
            return µµ(cached_article);

        return µƒ(self.url.random(lang_code)).then(x => {
            prefetch_related_articles(x);

            return x;
        }).catch((err) => {
            console.log("wot");
            console.log(err);
            // TODO: Handle error.
        });
    }
}();

void function NavController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("nav");
        self.related_nodes = ƒƒ("[navOption]", self.node).slice(1);

        º.listen({
            "nav::displayOptions": (article_data) => display_options(article_data),
            "nav::select": (choice) => {
                choice = Number(choice) - 1;
                const article_data = self.related_article_buffer[choice];

                if (!article_data)
                    return void º.emit`article::loadRandom`();

                º.emit`article::set_contents`(article_data, true);
                º.emit`wikiapi::prefetchRelatedArticles`(article_data);
            }
        });
    }();

    function display_options(article_data) {
        º.req`wikiapi::fetchRelatedArticles`(article_data).then((articles) => {
            self.related_article_buffer = Array();
            self.related_nodes.forEach((node) => {
                const article_data = articles?.pages
                    .splice(Math.floor(Math.random() * articles.pages.length), 1)
                    .pop();

                self.related_article_buffer.push(article_data);
                ƒ("[navOptionTitle]", node).dataset.text = article_data?.titles.normalized;
            });
        });
    }
}();

void function section() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("section");
        self.areas = º.req`areas::get`();

        // Position frame on inital load, afterwards only reposition on the transition
        // from article to nav.
        reposition();

        º.listen({
            "nav::displayOptions": () => {
                self.node.setAttribute("show", "nav");
                reposition();
            },
            "article::set_contents": () => self.node.setAttribute("show", "article"),
            "article::loadRandom": () => self.node.setAttribute("show", "article"),
            "section::reposition": () => reposition(),
            "areas::update": (areas) => {
                self.areas = areas;
                reposition();
            },
        });
    }();

    function rand(val) {
        return Math.floor(Math.random() * val);
    }

    function reposition() {
        const padding = º.req`theme::px`("--main-padding");
        const article_base_width = º.req`theme::px`("--article-base-width");
        const article_width_shift = º.req`theme::px`("--article-width-shift");
        const article_base_height = º.req`theme::px`("--article-base-height");
        const article_height_shift = º.req`theme::px`("--article-height-shift");

        const max_width = self.areas.main.w - padding * 2;
        const width = Math.min(
            article_base_width + rand((Math.random() > .5 ? 1 : -1) * article_width_shift),
            max_width
        );
        console.log(rand((Math.random() > .5 ? 1 : -1) * article_width_shift));

        const max_height = self.areas.main.h - padding * 2;
        const height = Math.min(
            article_base_height + rand((Math.random() > .5 ? 1 : -1) * article_height_shift),
            max_height
        );

        const left = padding + rand(self.areas.main.w - width - padding * 2);
        const top = padding + rand(self.areas.main.h - height - padding * 2);

        self.node.style.cssText = `
            left: ${left}px; width: ${width}px;
            top: ${top}px;   height: ${height}px;
        `;
    }
}();

void function article() {
    const self = Object.create(null);

    void function init() {
        self.article = ƒ("article");
        self.areas = º.req`areas::get`();
        self.current_article = undefined;

        º.respond({
            "article::get_active_token_text": () => ƒ(".active-token", self.article)?.dataset.word,
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
        });
    }();

    function tokenize(text) {
        const words = text
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
        ƒ("img", self.article).src = String();

        º.emit`nav::displayOptions`(self.current_article);
        self.current_article = undefined;
    }

    let spinner_id;
    function start_spinner(chars) {
        const self = ƒ(".loading_spinner");
        let idx = 0;

        function update_char(chars) {
            if (++idx > chars.length - 1)
                idx = 0;

            self.innerText = chars[idx];
        }

        update_char(chars);
        spinner_id = setInterval(() => update_char(chars), 128);
    }

    function display_loading(bool) {
        self.article.dataset.isLoading = bool;

        if (bool)
            start_spinner("-\\|/".split(""));
        else {
            clearInterval(spinner_id);
        }
    }

    function set_contents(data, is_related) {
        // TODO: Load related articles here.
        display_loading(false);

        self.current_article = data;

        tokenize(data.extract.length ? data.extract : data.displaytitle).forEach((token) => ƒ("p", self.article).appendChild(token));
        advance_token();

        self.article.dataset.title = data.displaytitle;
        self.article.dataset.canonicalTitle = data.titles.canonical;
        self.article.dataset.lang = data.lang;
        ƒ("img", self.article).src = data?.thumbnail?.source ?? String();

        º.emit`history::push`({ title: data.titles.normalized, is_related });
    }

    // TODO: Handle lang selection.
    function load_random() {
        display_loading(true);
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