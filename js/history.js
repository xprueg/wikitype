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

            º.emit`nav :forceHide`();
            º.emit`article :setContents`(self.cache.get(node.dataset.pageid));
            º.emit`input :clear`();
        }, true);

        º.listen({
            "history :push": (data) => push_entry(data),
            "history :cloneImage": (thumbnail_node) => clone_image(thumbnail_node),
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

    function push_entry({ article_data, is_related }) {
        const li = ª(ƒ("#historyEntryTemplate"), "li");
        const span = li.querySelector("span");

        if (!is_related) {
            li.dataset.chain = "start";
            remove_history_images();
        }

        li.dataset.pageid = article_data.pageid;
        span.innerText = article_data.titles.normalized;
        span.dataset.lang = article_data.lang;
        self.node.insertBefore(li, self.node.children.length
                                   ? self.node.children[0] : null);

        self.cache.set(String(article_data.pageid), article_data);
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

    function clone_image(thumbnail_node) {
        if (thumbnail_node.src !== "data:,") {
            const clone = ƒ("body").appendChild(thumbnail_node.cloneNode());
            const img_pos = thumbnail_node.getBoundingClientRect();

            clone.removeAttribute("id");
            clone.classList.add("history-image");
            clone.style.left = `${img_pos.x}px`;
            clone.style.top = `${img_pos.y}px`;

            setTimeout(() => {
                const img_pos_to = get_cloned_image_position(clone);

                clone.style.left = `${img_pos_to.x}px`;
                clone.style.top = `${img_pos_to.y}px`;
                clone.style.transform = `rotate(${img_pos_to.r}deg)`;
            });
        }
    }
}();