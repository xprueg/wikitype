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
            "history :push": article_data_raw => push_entry(article_data_raw),
            "article :beforeUnload": clone_image,
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

    function remove_history_images() {
        ƒƒ(".history-image").forEach((img) => {
            img.classList.add("hidden");
            setTimeout(
                () => img.remove(),
                getComputedStyle(img).getPropertyValue("--timing")
                                     .replace(/(\s|ms)/g, String())
            );
        });
    }

    function push_entry({ article_data_raw, is_related }) {
        const li = ª(ƒ("#historyEntryTemplate"), "li");
        const span = li.querySelector("span");

        if (!is_related) {
            li.dataset.chain = "start";
            remove_history_images();
        }

        li.dataset.pageid = article_data_raw.pageid;
        span.innerText = article_data_raw.titles.normalized;
        span.dataset.lang = article_data_raw.lang;
        self.node.insertBefore(li, self.node.children.length
                                   ? self.node.children[0] : null);

        self.cache.set(String(article_data_raw.pageid), article_data_raw);
    }

    function get_cloned_image_position(image) {
        const rand = (val) => Math.floor(Math.random() * val);
        const aside = ƒ("aside").getBoundingClientRect();
        const ref = {
            x: aside.left + aside.width / 2,
            y: rand(aside.height) + aside.top,
        };

        return {
            x: ref.x - image.width / 2,
            y: ref.y - image.height / 2,
            r: (Math.random() > .5 ? -1 : 1) * Math.random() * 360,
        };
    }

    function clone_image(current_article_data, $thumbnail_node) {
        if ($thumbnail_node.src !== "data:,") {
            const $clone = ƒ("body").appendChild($thumbnail_node.cloneNode());
            const img_pos = $thumbnail_node.getBoundingClientRect();

            $clone.removeAttribute("id");
            $clone.classList.add("history-image");
            $clone.style.left = `${img_pos.x}px`;
            $clone.style.top = `${img_pos.y}px`;

            setTimeout(() => {
                const img_pos_to = get_cloned_image_position($clone);

                $clone.style.left = `${img_pos_to.x}px`;
                $clone.style.top = `${img_pos_to.y}px`;
                $clone.style.transform = `rotate(${img_pos_to.r}deg)`;
            });
        }
    }
}();