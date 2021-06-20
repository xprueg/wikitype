void function HistoryController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ(".history");
        self.cache = new Map();

        self.node.addEventListener("click", (e) => {
            const node = e.target;
            if (!(node instanceof HTMLLIElement))
                return;

            while(node.previousElementSibling) {
                self.cache.delete(node.previousElementSibling.textContent);
                node.previousElementSibling.remove();
            }

            º.emit`article :setContents`(self.cache.get(e.target.textContent));
        }, true);

        º.listen({
            "history :push": (data) => push_entry(data),
            "history :cloneImage": (thumbnail_node) => clone_image(thumbnail_node),
        });
    }();

    function push_entry({ article_data, is_related }) {
        const li = ª(ƒ("#historyEntryTemplate"), "li");
        const span = li.querySelector("span");

        if (!is_related)
            li.dataset.chain = "start";

        span.innerText = article_data.titles.normalized;
        self.node.insertBefore(li, self.node.children.length
                                   ? self.node.children[0] : null);

        self.cache.set(article_data.titles.normalized, article_data);
    }

    function clone_image(thumbnail_node) {
        if (thumbnail_node.src !== "data:,") {
            const areas = º.req`areas::get`();
            const clone = ƒ("body").appendChild(thumbnail_node.cloneNode());
            const img_pos = thumbnail_node.getBoundingClientRect();

            clone.removeAttribute("id");
            clone.classList.add("footer-image");
            clone.style.left = `${img_pos.x}px`;
            clone.style.top = `${img_pos.y}px`;

            setTimeout(() => {
                const left = Math.round(Math.random() * areas.footer.w);
                const top = window.innerHeight - areas.footer.h
                            - º.req`theme::px`("--global-border-size");
                const rotation = (Math.random() > .5 ? -1 : 1) * Math.random() * 360;

                clone.style.left = `${left}px`;
                clone.style.top = `${top}px`;
                clone.style.transform = `rotate(${rotation}deg)`;
            });
        }
    }
}();