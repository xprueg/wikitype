void function ClockController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ(".clock");

        // Display current time.
        render();

        // Update time every 60 seconds, starting at the next minute change.
        setTimeout(
            () => render() || setInterval(render, 1000 * 60),
            1000 * (60 - new Date().getSeconds())
        );
    }();

    function render() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");

        self.node.innerText = `${h}:${m}`;
    }
}();