void function HistoryController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ(".history");
        self.entries = Array();

        º.listen({
            "history::push": (obj) => {
                self.entries.push(obj);
                push_entry(obj);
            },
        });
    }();

    function push_entry(obj) {
        const item = ª(ƒ("template#history_item"), "li");
console.log(obj);
        if (!obj.is_related)
            item.classList.add("chain_start");

        item.querySelector("span").innerText = obj.title;
        self.node.insertBefore(
            item,
            self.node.children.length ? self.node.children[0] : null
        );
    }
}();