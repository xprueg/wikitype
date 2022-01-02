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

        listen({
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
        const wikiapi_response = self.related_article_buffer[Number(choice) - 1];
        if (wikiapi_response) {
            emit`history :push`({ wikiapi_response, is_related: true });
            emit`article :setContents`(wikiapi_response);
            emit`wikiapi :prefetchRelatedArticles`(wikiapi_response);
        } else {
            req`wikiapi :fetchRandomArticle`().then(wikiapi_response => {
                emit`history :push`({ wikiapi_response, is_related: false });
                emit`article :setContents`(wikiapi_response);
            });
        }
    }

    function render_options(article_data) {
        reset_options();

        req`wikiapi :fetchRelatedArticles`(article_data._raw).then(articles => {
            const related_articles = articles.pages.filter(
                article => !req`history :includesPageId`(article.pageid)
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