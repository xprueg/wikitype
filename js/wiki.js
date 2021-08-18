void function WikiController() {
    const self = Object.create(null);

    void function init() {
        self.related_articles_cache = new Map();
        self.random_article_cache = new Map(º.req`language :getAll`()
                                             .map((lang) => [lang, Array()]));

        self.url = (() => {
            const headers = new Headers({
                "Api-User-Agent": "Wikitype (https://xpr.org/wikitype; abuse@xpr.org)"
            });

            const random = (lang_code) => new Request(
                `https://${lang_code}.wikipedia.org/api/rest_v1/page/random/summary`,
                { headers }
            );

            const related = (article_data) => {
                const lang = article_data.lang;
                const title = encodeURIComponent(article_data.titles.normalized);

                return new Request(
                    `https://${lang}.wikipedia.org/api/rest_v1/page/related/${title}`,
                    { headers }
                );
            }

            return { random, related };
        })();

        º.respond({
            "wikiapi :fetchRandomArticle": (lang_code) => {
                return load_random_article(lang_code);
            },
            "wikiapi :fetchArticleByFullUrl": (url) => {
                return load_article_by_full_url(url);
            },
            "wikiapi :fetchRelatedArticles": (article_data) => {
                return load_related_articles(article_data)
            },
        });

        º.listen({
            "wikiapi :prefetchRelatedArticles": (article_data) => {
                prefetch_related_articles(article_data)
            },
        });
    }();

    function prefetch_related_articles(article_data) {
        load_related_articles(article_data).then(
            (articles) => self.related_articles_cache.set(article_data.pageid,
                                                          articles)
        );
    }

    function prefetch_random_article(lang_code) {
        µƒ(self.url.random(lang_code)).then((article_data) => {
            prefetch_related_articles(article_data);
            self.random_article_cache.get(lang_code).push(article_data);
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

    function load_random_article(lang_code = º.req`language :getRandom`()) {
        prefetch_random_article(lang_code);

        const cached_article = self.random_article_cache.get(lang_code).shift();
        if (cached_article)
            return µµ(cached_article);

        return µƒ(self.url.random(lang_code)).then((article_data) => {
            prefetch_related_articles(article_data);

            return article_data;
        });
    }

    function load_article_by_full_url(wiki_url) {
        // https://lang.wikipedia.org/wiki/xyz
        // https://lang.wikipedia.org/api/rest_v1/page/summary/xyz
        wiki_url = wiki_url.replace(
            new RegExp(String.raw`(https://[a-z]{2}.wikipedia.org)/wiki/(.+)`),
            (_, domain, title) => {
                return `${domain}/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
            }
        );

        return µƒ(wiki_url).then((article_data) => {
            prefetch_related_articles(article_data);

            return article_data;
        });
    }
}();