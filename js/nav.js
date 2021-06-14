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