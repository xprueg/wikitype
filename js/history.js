class HistoryEntry {
    constructor({ wikiapi_response, is_related }) {
        this.wikiapi_response = wikiapi_response;
        this.is_related = is_related;

        const $li = ª(ƒ("#historyEntryTemplate"), "li");
        const $span = $li.querySelector("span");

        if (!is_related)
            $li.dataset.chain = "start";

        $li.dataset.id = wikiapi_response.pageid;
        $span.innerText = wikiapi_response.titles.normalized;
        $span.dataset.lang = wikiapi_response.lang;
        this.$node = $li;
        this.$text = $span;
    }

    get id() {
        return String(this.wikiapi_response.pageid);
    }
}

class HistoryMap extends Map {
    set(id, entry) {
        super.set(String(id), entry);
    }

    get(id) {
        return super.get(String(id));
    }

    get_wikiapi_response(id) {
        return this.get(id).wikiapi_response;
    }

    has(id) {
        return super.has(String(id));
    }

    delete(id) {
        const entry = this.get(id);
        entry.$node.remove();
        return super.delete(String(id));
    }
}

void new class History extends Controller {
    __data() {
        this.$node = ƒ(".history");
        /// <T> cache: MAP{STR: WikiResponse}
        this.cache = new HistoryMap();
    }

    __listen() {
        return {
            "history :push": this.push_entry.bind(this),
            "history :addWpmToPageId": this.add_wpm_to_page_id.bind(this),
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

    /// Removes all entries after the provided entry and loads the article.
    ///
    /// [>] $entry: HTMLLIELEMENT
    /// [<] VOID
    restore_entry($entry) {
        while ($entry.previousElementSibling)
            this.cache.delete($entry.previousElementSibling.dataset.id);

        const entry_wikiapi_response = this.cache.get_wikiapi_response($entry.dataset.id);
        emit`article :setContents`(entry_wikiapi_response);
        emit`nav :forceHide`();
        emit`input :clear`();
    }

    add_wpm_to_page_id(wpm, pageid) {
        const history_entry = this.cache.get(pageid);
        if (!history_entry)
            return;

        history_entry.$text.dataset.wpm = wpm;
    }

    push_entry({ wikiapi_response, is_related }) {
        const entry = new HistoryEntry({ wikiapi_response, is_related });

        this.$node.insertBefore(entry.$node, this.$node.children.length ? this.$node.children[0] : null);
        this.cache.set(entry.id, entry);
    }
}