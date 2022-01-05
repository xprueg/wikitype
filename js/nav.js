class NavOption {
    constructor(idx) {
        this.$node = ª(ƒ("template#navOption"), ".navOption");
        this.$title = this.$node.querySelector(".navOptionTitle");
        this.$node.querySelector("[data-nav-option-idx]").dataset.navOptionIdx = idx;
    }

    set_loading() {
        this.$node.dataset.status = "loading";
        this.$title.textContent = String();
    }

    set_available(wikiapi_response) {
        this.$node.dataset.status = "available";
        this.$title.textContent = wikiapi_response.titles.normalized;
    }

    set_unavailable() {
        this.$node.dataset.status = "unavailable";
        this.$title.textContent = String();
    }
}

void new class Nav extends Controller {
    __data() {
        this.$node = ƒ("nav");
        this.$nav_select = ƒ("#navSelect");
        this.option_count = 3;
        this.related_options = Array();
        this.related_article_buffer;

        this.on_keydown = this.handle_selection.bind(this);
    }

    __listen() {
        return {
            "article :afterUnload": article_data => {
                this.render_options(article_data.wikiapi_response);
            },
            "nav :forceHide": this.hide.bind(this),
        };
    }

    __init() {
        this.hide();

        for (let i = 0; i < this.option_count; ++i) {
            const Option = new NavOption(i + 1);
            this.$nav_select.append(Option.$node);
            this.related_options.push(Option);
        }
    }

    /// Shows the options and adds the event listener.
    ///
    /// [<] VOID
    show() {
        this.$node.classList.remove("hidden");
        document.body.addEventListener("keydown", this.on_keydown, true);
    }

    /// Hides the options and removes the event listener.
    ///
    /// [<] VOID
    hide() {
        this.$node.classList.add("hidden");
        document.body.removeEventListener("keydown", this.on_keydown, true);
    }

    /// Resets the options states and clears the related article buffer.
    ///
    /// [<] VOID
    reset_options() {
        this.related_article_buffer = Array();
        this.related_options.forEach(Option => Option.set_loading());
    }

    /// Updates the options states and shows them.
    ///
    /// [>] wikiapi_response: WikiResponse
    /// [<] VOID
    render_options(wikiapi_response) {
        this.reset_options();

        req`wikiapi :fetchRelatedArticles`(wikiapi_response).then(articles => {
            this.related_article_buffer = articles.pages
                .filter(article => !req`history :includesPageId`(article.pageid))
                .slice(0, this.option_count);

            for(let i = 0; i < this.option_count; ++i) {
                const Option = this.related_options[i];
                const wikiapi_response = this.related_article_buffer[i];

                if (wikiapi_response)
                    Option.set_available(wikiapi_response);
                else
                    Option.set_unavailable();
            }
        });

        this.show();
    }

    /// Handles the option selection.
    ///
    /// [>] evt: KEYBOARDEVENT
    /// [<] VOID
    handle_selection(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        this.select(Number(evt.key) - 1);
        this.hide();
    }

    /// Loads the choosen index from the list of related articles if
    /// available, or a random article elsewise.
    ///
    /// [>] choice: INT
    /// [<] VOID
    select(choice) {
        const wikiapi_response = this.related_article_buffer[choice];
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
}();