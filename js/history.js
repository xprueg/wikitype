void new class History extends Controller {
    __data() {
        this.$node = ƒ(".history");
        /// <T> cache: MAP{STR: WikiResponse}
        this.cache = new Map();
    }

    __listen() {
        return {
            "history :push": this.push_entry.bind(this),
            "history :addWpmToPageId": this.add_wpm_to_page_id.bind(this),
        };
    }
    __respond() {
        return {
            "history :includesPageId": pageid => this.cache.has(String(pageid)),
        };
    }

    __init() {
        this.$node.addEventListener("click", e => {
            const $target = e.target;
            if (!($target instanceof HTMLLIElement))
                return;

            while($target.previousElementSibling) {
                this.cache.delete($target.previousElementSibling.dataset.pageid);
                $target.previousElementSibling.remove();
            }

            emit`article :setContents`(this.cache.get($target.dataset.pageid));
            emit`nav :forceHide`();
            emit`input :clear`();
        }, true);
    }

    add_wpm_to_page_id(wpm, pageid) {
        const $history_item = ƒ(`[data-pageid="${pageid}"]`);
        if (!$history_item)
            return;

        ƒ("[data-lang]", $history_item).dataset.wpm = wpm;
    }

    push_entry({ wikiapi_response, is_related }) {
        const $li = ª(ƒ("#historyEntryTemplate"), "li");
        const $span = $li.querySelector("span");

        if (!is_related)
            $li.dataset.chain = "start";

        $li.dataset.pageid = wikiapi_response.pageid;
        $span.innerText = wikiapi_response.titles.normalized;
        $span.dataset.lang = wikiapi_response.lang;
        this.$node.insertBefore($li, this.$node.children.length ? this.$node.children[0] : null);

        this.cache.set(String(wikiapi_response.pageid), wikiapi_response);
    }
}