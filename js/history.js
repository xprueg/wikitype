class HistoryEntry {
    constructor({ wikiapi_response, is_related }) {
        this.wikiapi_response = wikiapi_response;

        this.$node = ª(ƒ("#historyEntryTemplate"), "li");
        this.$node.dataset.id = wikiapi_response.pageid;
        if (!is_related)
            this.$node.dataset.chain = "start";

        this.$title = this.$node.querySelector(".title");
        this.$title.innerText = wikiapi_response.titles.normalized;
        this.$title.dataset.lang = wikiapi_response.lang;
    }

    get id() {
        return String(this.wikiapi_response.pageid);
    }

    update(data, val) {
        switch(data) {
            case "wpm":
                this.$node.querySelector(".wpm").textContent = val;
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
    __respond() {
        return {
            "history :includesPageId": id => this.cache.has(id),
        };
    }

    __init() {
        this.$node.addEventListener("click", e => {
            const $target = e.target;
            if (!($target instanceof HTMLLIElement))
                return;

            this.restore_entry($target);
        }, true);
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
}