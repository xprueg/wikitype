void function WikiController() {
    const self = Object.create(null);

    void function init() {
        self.related_articles_cache = new Map();
        self.random_article_cache = new Map(
            Object.keys(req`language :getAll`()).map((lang) => [lang, Array()])
        );

        self.url = (() => {
            const headers = new Headers({
                "Api-User-Agent": "Wikitype (https://xpr.org/wikitype; abuse@xpr.org)"
            });

            const random = (lang_code) => new Request(
                `https://${lang_code}.wikipedia.org/api/rest_v1/page/random/summary`,
                { headers }
            );

            const related = (article_data_raw) => {
                const lang = article_data_raw.lang;
                const title = encodeURIComponent(article_data_raw.titles.normalized);

                return new Request(
                    `https://${lang}.wikipedia.org/api/rest_v1/page/related/${title}`,
                    { headers }
                );
            }

            return { random, related };
        })();

        respond({
            "wikiapi :fetchRandomArticle": lang_code => load_random_article(lang_code),
            "wikiapi :fetchArticleByFullUrl": url => load_article_by_full_url(url),
            "wikiapi :fetchRelatedArticles": article_data_raw => {
                return load_related_articles(article_data_raw)
            },
        });

        listen({
            "wikiapi :prefetchRelatedArticles": article_data_raw => {
                prefetch_related_articles(article_data_raw)
            },
        });
    }();

    function prefetch_related_articles(article_data_raw) {
        load_related_articles(article_data_raw).then(
            articles => self.related_articles_cache.set(article_data_raw.pageid, articles)
        );
    }

    function prefetch_random_article(lang_code) {
        fetch_json(self.url.random(lang_code)).then(article_data_raw => {
            prefetch_related_articles(article_data_raw);
            self.random_article_cache.get(lang_code).push(article_data_raw);
        });
    }

    function load_related_articles(article_data_raw) {
        const article_id = article_data_raw.pageid;

        const cached_related_articles = self.related_articles_cache.get(article_id)
        if (cached_related_articles) {
            self.related_articles_cache.delete(article_id);
            return resolve_promise(cached_related_articles);
        }

        return fetch_json(self.url.related(article_data_raw), { pages: Array() });
    }

    function load_random_article(lang_code = req`language :getRandom`()) {
        prefetch_random_article(lang_code);

        const cached_article = self.random_article_cache.get(lang_code).shift();
        if (cached_article)
            return resolve_promise(cached_article);

        return fetch_json(self.url.random(lang_code)).then(article_data_raw => {
            prefetch_related_articles(article_data_raw);

            return article_data_raw;
        });
    }

    function load_article_by_full_url(wiki_url) {
        // https://lang.wikipedia.org/wiki/xyz
        // https://lang.wikipedia.org/api/rest_v1/page/summary/xyz
        wiki_url = wiki_url.replace(
            new RegExp(String.raw`(https://[a-z]{2}.wikipedia.org)/wiki/(.+)`),
            (_, domain, title) => {
                return `${domain}/api/rest_v1/page/summary/${title}`;
            }
        );

        return fetch_json(wiki_url).then(article_data_raw => {
            prefetch_related_articles(article_data_raw);

            return article_data_raw;
        });
    }
}();