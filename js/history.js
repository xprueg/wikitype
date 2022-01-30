class HistoryEntry {
    constructor({ wikiapi_response, is_related }) {
        this.wikiapi_response = wikiapi_response;

        this.$node = ª(ƒ("#historyEntryTemplate"), ".entry");
        this.$node.dataset.id = wikiapi_response.pageid;
        if (!is_related)
            this.$node.dataset.chain = "start";

        this.$image = this.$node.querySelector(".thumbnail");
        this.$image.src = wikiapi_response?.thumbnail?.source;

        this.$title = this.$node.querySelector(".title");
        this.$title.innerText = wikiapi_response.titles.normalized;
        this.$title.dataset.lang = wikiapi_response.lang;
        this.$title.dataset.wpm = 0;
    }

    get id() {
        return String(this.wikiapi_response.pageid);
    }

    update(data, val) {
        switch(data) {
            case "wpm":
                this.$title.dataset.wpm = val;
                break;
            default:
                break;
        }
    }
}

class HistoryMap extends Map {
    create({ wikiapi_response, is_related }) {
        const entry = new HistoryEntry({ wikiapi_response, is_related });
        super.set(String(entry.id), entry);
        return entry;
    }

    get(id) {
        return super.get(String(id));
    }

    update(id, data, val) {
        this.get(id)?.update(data, val);
    }

    get_wikiapi_response(id) {
        return this.get(id)?.wikiapi_response;
    }

    has(id) {
        return super.has(String(id));
    }

    destroy(id) {
        const entry = this.get(id);
        super.delete(String(id));
        return entry;
    }
}

void new class History extends Controller {
    __data() {
        this.$node = ƒ(".history");
        /// <T> cache: MAP{STR: HistoryEntry}
        this.cache = new HistoryMap();
    }

    __listen() {
        return {
            "history :push": this.push_entry.bind(this),
            "history :addWpmToPageId": (wpm, id) => this.cache.update(id, "wpm", wpm),
        };
    }

    __shortcuts() {
        return {
            "tab": {
                keydown: e => (this.display_highres_image(true), e.preventDefault()),
                keyup: e => (this.display_highres_image(false), e.preventDefault()),
            },
        };
    }

    __respond() {
        return {
            "history :includesPageId": id => this.cache.has(id),
        };
    }

    __init() {
        this.$node.addEventListener("click", evt => {
            if (evt.target.classList.contains("title"))
                this.restore_entry(evt.target.parentNode);
        }, true);
    }

    get_active_entry() {
        const entry = this.$node.querySelector("li.entry");
        if (!entry)
            return;

        return this.cache.get(entry.dataset.id);
    }

    /// Adds an entry to the history.
    ///
    /// [>] OBJ{wikiapi_response: WikiResponse, is_related: BOOL}
    /// [<] VOID
    push_entry({ wikiapi_response, is_related }) {
        const entry = this.cache.create({ wikiapi_response, is_related });
        this.$node.insertBefore(entry.$node, this.$node.children.length ? this.$node.children[0] : null);
    }

    /// Removes all entries after the provided entry and loads the article.
    ///
    /// [>] $entry: HTMLLIELEMENT
    /// [<] VOID
    restore_entry($entry) {
        const entry_wikiapi_response = this.cache.get_wikiapi_response($entry.dataset.id);

        while ($entry.previousElementSibling) {
            const entry = this.cache.destroy($entry.previousElementSibling.dataset.id);
            entry.$node.remove();
        }

        emit`article :setContents`(entry_wikiapi_response);
        emit`nav :forceHide`();
        emit`input :clear`();
    }

    display_highres_image(should_render) {
        const entry = this.get_active_entry();
        if (!entry)
            return;

        const data = entry.wikiapi_response;
        const id = data.id;
        const image = data?.originalimage.source;

        // Remove source if it shouldn't be rendered.
        if (!should_render)
            return void (entry.$image.classList.remove("highres"));

        // If there is no current article loaded or
        // the highres image is already set return.
        if (!entry || !image || entry.$image.classList.contains("highres"))
            return;

        // Display the scaled up thumbnail while waiting for the highres version.
        entry.$image.src = data?.thumbnail?.source;
        entry.$image.classList.add("highres");
        entry.$image.style.cssText = `--original-height: ${data?.originalimage.width}px;
                                      --original-width: ${data?.originalimage.height}px;`;

        if (entry.$image.classList.contains("loaded"))
            return void (entry.$image.src = data?.originalimage.source);

        preload_image(data?.originalimage.source, img => {
            // If, while the image has been loaded, the article got changed ignore
            // the incoming highres image.
            if (!entry || data.id !== id)
                return;

            entry.$image.classList.add("loaded");
            entry.$image.src = img.src;
        });
    }
}