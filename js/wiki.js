void new class Wiki extends Controller {
    __data() {
        this.related_articles_cache = new Map();
        this.random_article_cache = new Map(
            Object.keys(req`language :getAll`()).map(lang => [lang, Array()])
        );
    }

    __listen() {
        return {
            "wikiapi :prefetchRelatedArticles": this.prefetch_related_articles.bind(this),
        };
    }

    __respond() {
        return {
            "wikiapi :fetchRandomArticle": this.load_random_article.bind(this),
            "wikiapi :fetchArticleByFullUrl": this.load_article_by_full_url.bind(this),
            "wikiapi :fetchRelatedArticles": this.load_related_articles.bind(this),
        };
    }

    get headers() {
        return new Headers({
            "Api-User-Agent": "Wikitype (https://xpr.org/wikitype; abuse@xpr.org)",
        });
    }

    random_url(lang_code) {
        return new Request(
            `https://${lang_code}.wikipedia.org/api/rest_v1/page/random/summary`,
            { headers: this.headers }
        );
    }

    related_url(article_data_raw) {
        const lang = article_data_raw.lang;
        const title = encodeURIComponent(article_data_raw.titles.normalized);

        return new Request(
            `https://${lang}.wikipedia.org/api/rest_v1/page/related/${title}`,
            { headers: this.headers }
        );
    }

    prefetch_related_articles(article_data_raw) {
        this.load_related_articles(article_data_raw).then(
            articles => this.related_articles_cache.set(article_data_raw.pageid, articles)
        );
    }

    prefetch_random_article(lang_code) {
        fetch_json(this.random_url(lang_code)).then(article_data_raw => {
            this.prefetch_related_articles(article_data_raw);
            this.random_article_cache.get(lang_code).push(article_data_raw);
        });
    }

    load_related_articles(article_data_raw) {
        const article_id = article_data_raw.pageid;

        const cached_related_articles = this.related_articles_cache.get(article_id)
        if (cached_related_articles) {
            this.related_articles_cache.delete(article_id);
            return resolve_promise(cached_related_articles);
        }

        return fetch_json(this.related_url(article_data_raw), { pages: Array() });
    }

    load_random_article(lang_code = req`language :getRandom`()) {
        this.prefetch_random_article(lang_code);

        const cached_article = this.random_article_cache.get(lang_code).shift();
        if (cached_article)
            return resolve_promise(cached_article);

        return fetch_json(this.random_url(lang_code)).then(article_data_raw => {
            this.prefetch_related_articles(article_data_raw);

            return article_data_raw;
        });
    }

    load_article_by_full_url(wiki_url) {
        // https://lang.wikipedia.org/wiki/xyz
        // https://lang.wikipedia.org/api/rest_v1/page/summary/xyz
        wiki_url = wiki_url.replace(
            new RegExp(String.raw`(https://[a-z]{2}.wikipedia.org)/wiki/(.+)`),
            (_, domain, title) => {
                return `${domain}/api/rest_v1/page/summary/${title}`;
            }
        );

        return fetch_json(wiki_url).then(article_data_raw => {
            this.prefetch_related_articles(article_data_raw);

            return article_data_raw;
        });
    }
}