void function AreaController() {
    // FIXME: Create new area that contains the articles since the header is now included
    // in the <main> element.
    let areas = Object.create(null);

    void function init() {
        update_areas();

        window.addEventListener("resize", () => {
           update_areas();
           º.emit`areas::update`(areas);
        });

        º.respond({
            "areas::get": () => areas,
        });
    }();

    function update_areas() {
        const gbs = º.req`theme::px`("--global-border-size");
        const header = ƒ("header").getBoundingClientRect();
        const main = ƒ("main").getBoundingClientRect();
        const footer = ƒ("footer").getBoundingClientRect();

        areas.header = {
            x: header.left + gbs, w: header.width - gbs,
            y: header.top,        h: header.height,
        };

        areas.main = {
            x: main.left + gbs, w: main.width - gbs,
            y: main.top + gbs,  h: main.height - gbs * 2,
        }

        areas.footer = {
            x: footer.left + gbs, w: footer.width - gbs,
            y: footer.top,        h: footer.height,
        }
    }
}();