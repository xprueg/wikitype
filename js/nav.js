void function NavController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("nav");
        self.related_nodes = ƒƒ(".navOption", self.node).slice(1);
        self.related_article_buffer;

        hide();

        document.body.addEventListener("keydown", (e) => {
            if (is_hidden())
                return;

            e.preventDefault();
            e.stopPropagation();

            select(e.key);
            hide()
        }, true);

        º.listen({
            "nav :displayOptions": (article_data) => (render_options(article_data),
                                                      show()),
            "nav :forceHide": () => hide(),
        });
    }();

    function show() {
        self.node.dataset.isVisible = true;
    }

    function hide() {
        self.node.dataset.isVisible = false;
    }

    function is_hidden() {
        return self.node.dataset.isVisible === String("false");
    }

    function reset_options() {
        self.related_nodes.forEach((node) => {
            node.dataset.isAvailable = false;
            ƒ(".navOptionTitle", node).textContent = String();
        });
    }

    function select(choice) {
        const article_data = self.related_article_buffer[Number(choice) - 1];
        if (!article_data) {
            º.req`wikiapi :fetchRandomArticle`().then((article_data) => {
                º.emit`history :push`({ article_data, is_related: false });
                º.emit`article :setContents`(article_data);
            });

            return;
        }

        º.emit`history :push`({ article_data, is_related: true });
        º.emit`article :setContents`(article_data);
        º.emit`wikiapi :prefetchRelatedArticles`(article_data);
    }

    function render_options(article_data) {
        reset_options();

        º.req`wikiapi :fetchRelatedArticles`(article_data).then((articles) => {
            self.related_article_buffer = Array();
            self.related_nodes.forEach((node) => {
                const article_data = articles?.pages
                    .splice(Math.floor(Math.random() * articles.pages.length), 1)
                    .pop();

                if (article_data) {
                    self.related_article_buffer.push(article_data);
                    node.dataset.isAvailable = true;
                    ƒ(".navOptionTitle", node).textContent = article_data.titles.normalized;
                } else {
                    node.dataset.isAvailable = false;
                    ƒ(".navOptionTitle", node).textContent = ["⸘̶̨̘̔̒⁈̵̺͔͐͠¿̶̜͚̾⁉̶̮͈͛̑⸘̴͕̦̊͗", "⸘̷͙͙̽⁈̸͔͇̽͝⸘̸̘̤̘̀¿̶̰̉͘⁉̸̹̜́̿̂⸘̶̤̠̽̚⁈̴͕̋͊̈́⸘̴͚͋̐"];
                }
            });
        });
    }
}();