void function Spinner() {
    const self = Object.create(null);

    void function init() {
        self.spinner = new Map();

        º.listen({
            "spinner :spawn": (node) => spawn_spinner(node),
            "spinner :kill": (node) => kill_spinner(node),
        });
    }();

    function spawn_spinner(node) {
        // Prevent multiple spinner on a single node.
        if (self.spinner.has(node))
            return;

        const spinner = document.createElement("div");
        spinner.setAttribute("id", "loadingSpinner");

        const chars = º.req`theme :val`("--article-loading-spinner-chars");
        const delay = º.req`theme :val`("--article-loading-spinner-delay");
        self.spinner.set(node, new Map([
            ["spinner", node.appendChild(spinner)],
            ["idx", 0],
            ["chars", chars],
            ["id", setInterval(update_spinner.bind(node), delay)],
        ]));

        update_spinner.call(node);
    }

    function kill_spinner(node) {
        if (!self.spinner.has(node))
            return;

        const data = self.spinner.get(node);
        const spinner = data.get("spinner");
        const id = data.get("id");

        spinner.remove();
        clearInterval(id);

        self.spinner.delete(node);
    }

    function update_spinner() {
        const data = self.spinner.get(this);
        const chars = data.get("chars");

        let idx = data.get("idx");
        if (++idx > chars.length - 1)
            idx = 0;

        data.get("spinner").innerText = chars[idx];
        data.set("idx", idx);
    }
}();