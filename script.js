function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');

    ƒ(".clock").innerText = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 1000 * 60);

void function theme() {
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

void function history() {
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

void function wikipai() {
    const self = Object.create(null);

    void function init() {
        º.respond({
            "wikiapi::fetch": (obj) => load(obj),
            "wikiapi::related": (lang, title) => related(lang, title),
        });
    }();

    function related(lang, title) {
        title = encodeURIComponent(title);
        const url = `https://${lang}.wikipedia.org/api/rest_v1/page/related/${title}`;

        return fetch(url)
        .then((x) => x.json())
        .catch((e) => {
            console.log("oops");
            console.log(e);
        });
    }

    function load(obj) {
        const url = `https://${obj.lang}.wikipedia.org/api/rest_v1/page/random/summary`;

        if (obj.count === 1) {
            return fetch(url)
            .then((x) => x.json())
            .catch((e) => {
                console.log("oops");
                console.log(e);
            });
        }

        return Promise.all(
            Array.from({ length: obj.count })
                .map(() => fetch(url).then((x) => x.json()))
        );
    }
}();

void function nav() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("nav");
        self.related_nodes = ƒƒ("[related] > div", self.node);

        º.listen({
            "nav::show": (lang, title) => show(lang, title),
            "nav::select": (choice) => {
                if (choice === "0") {
                    º.emit`article::loadRandom`();
                    return;
                }

                º.emit`article::set_contents`(self.related[+choice - 1], true);
            }
        });
    }();

    function show(lang, title) {
        º.req`wikiapi::related`(lang, title).then((data) => {
            self.related = Array();
            self.related_nodes.forEach((node) => {
                // TODO: Prevent dupes.
                const upcoming = data.pages[Math.floor(Math.random() * data.pages.length)];

                if (upcoming) {
                    self.related.push(upcoming);
                    ƒ("[article]", node).innerText = upcoming.titles.normalized;
                } else {
                    // TODO: Hide entry if there is no related article.
                    ƒ("[article]", node).innerText = "???";
                }
            });
            console.log(self.related);
        });

        // canonical
//         console.log(articles);
//         self.node.removeAttribute("upnext_hidden");
//
//         [...self.node.querySelectorAll("[data-next=choice]")].forEach((node, i) => {
//             node.querySelector("[article]").innerText = articles[i];
//         });
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
            "nav::show": () => {
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
            "article::loadRandom": (lang) => load_random(lang),
            "article::set_contents": (...args) => set_contents(...args),
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
        const img_pos = ƒ("img", self.article).getBoundingClientRect();
        const padding = 0; //self.areas.footer.h / 2;
        const top = img_pos.y;
        const left = img_pos.x;

    // const bottom =     bottom: calc(var(--global-border-size) + var(--footer-height) / 2);
//
//         const padding = self.areas.footer.h / 2;
//         const left = padding + Math.floor(Math.random() * (self.areas.footer.w - padding));

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
        // img.style.transform = `translate(-50%, 50%) rotate(${Math.floor(Math.random() * 360)}deg)`;

        ƒ("p", self.article).innerHTML = String();
        ƒ("img", self.article).src = String();

        º.emit`nav::show`(self.article.dataset.lang, self.article.dataset.canonicalTitle);
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
        display_loading(false);

        tokenize(data.extract.length ? data.extract : data.displaytitle).forEach((token) => ƒ("p", self.article).appendChild(token));
        advance_token();

        self.article.dataset.title = data.displaytitle;
        self.article.dataset.canonicalTitle = data.titles.canonical;
        self.article.dataset.lang = data.lang;
        ƒ("img", self.article).src = data?.thumbnail?.source ?? "https://de.wikipedia.org/wiki/918#/media/Datei:Konrad_I.png";

        º.emit`history::push`({ title: data.titles.normalized, is_related });
    }

    // TODO: Handle lang selection.
    function load_random(lang = "en") {
        display_loading(true);
        º.req`wikiapi::fetch`({ lang, count: 1 })
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