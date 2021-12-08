void function HistoryController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ(".history");
        self.cache = new Map();

        self.node.addEventListener("click", e => {
            const node = e.target;
            if (!(node instanceof HTMLLIElement))
                return;

            while(node.previousElementSibling) {
                self.cache.delete(node.previousElementSibling.dataset.pageid);
                node.previousElementSibling.remove();
            }

            º.emit`article :setContents`(self.cache.get(node.dataset.pageid));
            º.emit`nav :forceHide`();
            º.emit`input :clear`();
        }, true);

        º.listen({
            "history :push": push_entry,
            "history :addWpmToPageId": add_wpm_to_page_id,
        });

        º.respond({
            "history :includesPageId": pageid => {
                for (const key of self.cache.keys())
                    if (key == pageid)
                        return true;

                return false;
            },
        });
    }();

    function add_wpm_to_page_id(wpm, pageid) {
        const $history_item = ƒ(`[data-pageid="${pageid}"]`);
        if (!$history_item)
            return;

        ƒ("[data-lang]", $history_item).dataset.wpm = wpm;
    }

    function push_entry({ article_data_raw, is_related }) {
        const li = ª(ƒ("#historyEntryTemplate"), "li");
        const span = li.querySelector("span");

        if (!is_related)
            li.dataset.chain = "start";

        li.dataset.pageid = article_data_raw.pageid;
        span.innerText = article_data_raw.titles.normalized;
        span.dataset.lang = article_data_raw.lang;
        self.node.insertBefore(li, self.node.children.length
                                   ? self.node.children[0] : null);

        self.cache.set(String(article_data_raw.pageid), article_data_raw);
    }
}();