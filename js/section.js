void function SectionController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("#article");
        self.areas = º.req`areas::get`();

        // Position frame on inital load, afterwards only reposition on the transition
        // from article to nav.
        reposition();

        º.listen({
            "nav::displayOptions": () => {
                ƒ("nav").dataset.isVisible = true;
                reposition();
            },
            "article::set_contents": () => ƒ("nav").dataset.isVisible = false,
            "article::loadRandom": () => ƒ("nav").dataset.isVisible = false,
            "section::reposition": () => reposition(),
            "areas::update": (areas) => {
                self.areas = areas;
                reposition();
            },
        });
    }();

    function rand(val) {
        return Math.floor(Math.random() * val);
    }

    function reposition() {
        const padding = º.req`theme::px`("--main-padding");
        const article_base_width = º.req`theme::px`("--article-base-width");
        const article_width_shift = º.req`theme::px`("--article-width-shift");
        const article_base_height = º.req`theme::px`("--article-base-height");
        const article_height_shift = º.req`theme::px`("--article-height-shift");

        const max_width = self.areas.main.w - padding * 2;
        const width = Math.min(
            article_base_width + rand((Math.random() > .5 ? 1 : -1) * article_width_shift),
            max_width
        );

        const max_height = self.areas.main.h - padding * 2;
        const height = Math.min(
            article_base_height + rand((Math.random() > .5 ? 1 : -1) * article_height_shift),
            max_height
        );

        const left = padding + rand(self.areas.main.w - width - padding * 2);
        const top = padding + rand(self.areas.main.h - height - padding * 2);

        self.node.style.cssText = `
            left: ${left}px; width: ${width}px;
            top: ${top}px;   height: ${height}px;
        `;
    }
}();