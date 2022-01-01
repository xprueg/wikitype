/// <T> WikiImage: OBJ{
///     source: STR,
///     width: INT,
///     height: INT,
/// }

/// <T> WikiResponse: OBJ{
///     title: STR,
///     titles: OBJ{
///         canonical: STR,
///         normalized: STR,
///         display: STR,
///     },
///     displaytitle: STR,
///     lang: STR,
///     pageid: INT,
///     content_urls: OBJ{
///         desktop: OBJ{
///             page: STR,
///             edit: STR,
///         },
///     },
///     originalimage: WikiImage,
///     thumbnail: WikiImage,
///     extract: STR,
/// }

/// <T> WikiRelatedResponse: OBJ{
///     pages: ARR[WikiResponse]
/// }

void new class WikiApi extends Controller {
    __data() {
        /// <T> cache: MAP{
        ///     STR: ARR[WikiResponse],
        ///     INT: WikiRelatedResponse,
        /// }
        this.cache = new Map();
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

    /// Returns a Headers object that contains the "Api-User-Agent" header which is
    /// required for Wikipedia API calls.
    ///
    /// [<] HEADERS
    get headers() {
        return new Headers({
            "Api-User-Agent": "Wikitype (https://xpr.org/wikitype; abuse@xpr.org)",
        });
    }

    /// Returns a Request object that will return a random article when fetched.
    ///
    /// [>] lang_code: STR
    /// [<] REQUEST
    random_url(lang_code) {
        return new Request(
            `https://${lang_code}.wikipedia.org/api/rest_v1/page/random/summary`,
            { headers: this.headers }
        );
    }

    /// Returns a Request object that will return related articles when fetched.
    ///
    /// [>] wikiapi_response: WikiResponse
    /// [<] REQUEST
    related_url(wikiapi_response) {
        const lang = wikiapi_response.lang;
        const title = encodeURIComponent(wikiapi_response.titles.normalized);

        return new Request(
            `https://${lang}.wikipedia.org/api/rest_v1/page/related/${title}`,
            { headers: this.headers }
        );
    }

    /// Returns all related articles to the passed in article.
    ///
    /// [>] wikiapi_response: WikiResponse
    /// [<] PROMISE
    load_related_articles(wikiapi_response) {
        const article_id = wikiapi_response.pageid;

        const cached_related_articles = this.cache.get(article_id);
        if (cached_related_articles) {
            this.cache.delete(article_id);
            return resolve_promise(cached_related_articles);
        }

        return fetch_json(this.related_url(wikiapi_response), { pages: Array() });
    }

    /// Loads a random article for the provided language.
    ///
    /// [>] lang_code[? = req`language :getRandom`()]: STR
    /// [<] PROMISE
    load_random_article(lang_code = req`language :getRandom`()) {
        this.prefetch_random_article(lang_code);

        const cached_articles = this.cache.get(lang_code);
        if (cached_articles && cached_articles.length > 0)
            return resolve_promise(cached_articles.shift());

        return fetch_json(this.random_url(lang_code)).then(wikiapi_response => {
            this.prefetch_related_articles(wikiapi_response);

            return wikiapi_response;
        });
    }

    /// Loads the article url.
    /// The url must have the format "https://lang.wikipedia.org/wiki/xyz".
    ///
    /// [>] wiki_url: STR
    /// [<] PROMISE
    load_article_by_full_url(wiki_url) {
        // https://lang.wikipedia.org/wiki/xyz
        // https://lang.wikipedia.org/api/rest_v1/page/summary/xyz
        wiki_url = wiki_url.replace(
            new RegExp(String.raw`(https://[a-z]{2}.wikipedia.org)/wiki/(.+)`),
            (_, domain, title) => `${domain}/api/rest_v1/page/summary/${title}`
        );

        return fetch_json(wiki_url).then(wikiapi_response => {
            this.prefetch_related_articles(wikiapi_response);

            return wikiapi_response;
        });
    }

    /// Prefetches related articles.
    ///
    /// [>] wikiapi_response: WikiResponse
    /// [<] VOID
    prefetch_related_articles(wikiapi_response) {
        this.load_related_articles(wikiapi_response)
            .then(articles => this.cache.set(wikiapi_response.pageid, articles));
    }

    /// Prefetches random articles for the specified languages.
    ///
    /// [>] lang_code: STR
    /// [<] VOID
    prefetch_random_article(lang_code) {
        fetch_json(this.random_url(lang_code)).then(wikiapi_response => {
            this.prefetch_related_articles(wikiapi_response);

            if (!this.cache.has(lang_code))
                this.cache.set(lang_code, Array());
            this.cache.get(lang_code).push(wikiapi_response);
        });
    }
}