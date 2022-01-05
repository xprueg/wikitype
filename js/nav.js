void new class Nav extends Controller {
    __data() {
        this.$node = ƒ("nav");
        this.related_nodes = ƒƒ(".navOption", this.$node).slice(1);
        this.related_article_buffer;
    }

    __listen() {
        return {
            "article :afterUnload": article_data => (this.render_options(article_data), this.show()),
            "nav :displayOptions": article_data => (this.render_options(article_data), this.show()),
            "nav :forceHide": () => this.hide(),
        };
    }

    __init() {
        this.hide();

        document.body.addEventListener("keydown", e => {
            if (this.is_hidden())
                return;

            e.preventDefault();
            e.stopPropagation();

            this.select(e.key);
            this.hide();
        }, true);
    }

    show() {
        this.$node.dataset.isVisible = true;
    }

    hide() {
        this.$node.dataset.isVisible = false;
    }

    is_hidden() {
        return this.$node.dataset.isVisible === String("false");
    }

    reset_options() {
        this.related_article_buffer = Array();
        this.related_nodes.forEach(node => {
            node.dataset.status = "loading";
            ƒ(".navOptionTitle", node).textContent = String();
        });
    }

    select(choice) {
        const wikiapi_response = this.related_article_buffer[Number(choice) - 1];
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

    render_options(article_data) {
        this.reset_options();

        req`wikiapi :fetchRelatedArticles`(article_data._raw).then(articles => {
            const related_articles = articles.pages.filter(
                article => !req`history :includesPageId`(article.pageid)
            );

            this.related_nodes.forEach(node => {
                const related_article_data = related_articles
                    .splice(Math.floor(Math.random() * related_articles.length), 1)
                    .pop();

                if (related_article_data) {
                    this.related_article_buffer.push(related_article_data);
                    node.dataset.status = "available";
                    ƒ(".navOptionTitle", node).textContent = related_article_data.titles.normalized;
                } else {
                    node.dataset.status = "unavailable";
                }
            });
        });
    }
}();