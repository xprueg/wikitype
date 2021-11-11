void function NavController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("nav");
        self.related_nodes = ƒƒ(".navOption", self.node).slice(1);
        self.related_article_buffer;

        hide();

        document.body.addEventListener("keydown", e => {
            if (is_hidden())
                return;

            e.preventDefault();
            e.stopPropagation();

            select(e.key);
            hide();
        }, true);

        º.listen({
            "article :afterUnload": article_data => (render_options(article_data), show()),
            "nav :displayOptions": article_data => (render_options(article_data), show()),
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
        self.related_article_buffer = Array();
        self.related_nodes.forEach(node => {
            node.dataset.status = "loading";
            ƒ(".navOptionTitle", node).textContent = String();
        });
    }

    function select(choice) {
        const article_data_raw = self.related_article_buffer[Number(choice) - 1];
        if (article_data_raw) {
            º.emit`history :push`({ article_data_raw, is_related: true });
            º.emit`article :setContents`(article_data_raw);
            º.emit`wikiapi :prefetchRelatedArticles`(article_data_raw);
        } else {
            º.req`wikiapi :fetchRandomArticle`().then(article_data_raw => {
                º.emit`history :push`({ article_data_raw, is_related: false });
                º.emit`article :setContents`(article_data_raw);
            });
        }
    }

    function render_options(article_data) {
        reset_options();

        º.req`wikiapi :fetchRelatedArticles`(article_data._raw).then(articles => {
            const related_articles = articles.pages.filter(
                article => !º.req`history :includesPageId`(article.pageid)
            );

            self.related_nodes.forEach(node => {
                const related_article_data = related_articles
                    .splice(Math.floor(Math.random() * related_articles.length), 1)
                    .pop();

                if (related_article_data) {
                    self.related_article_buffer.push(related_article_data);
                    node.dataset.status = "available";
                    ƒ(".navOptionTitle", node).textContent = related_article_data.titles.normalized;
                } else {
                    node.dataset.status = "unavailable";
                }
            });
        });
    }
}();