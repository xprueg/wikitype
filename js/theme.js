void function ThemeController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ('html');
        self.active_theme = º.req`theme :getSelected`();
        self.themes = º.req`theme :getAll`();

        // Variables that can be controlled by the user.
        self.user = {
            __uFontFactor: 1,
        };

        // Dynamically changed variables, that cannot be overwritten.
        self.constants = {
            __kRandArticleBound: 0,
            __kArticleTokenX:    0,
            __kArticleTokenY:    0,
            __kArticleTokenW:    0,
            __kArticleTokenH:    0,
            __kArticleFrameX:    0,
            __kArticleFrameY:    0,
            __kArticleFrameW:    0,
            __kArticleFrameH:    0,
        };

        set_theme_to(self.active_theme);
        apply(self.user);
        apply(self.constants);

        º.emit`shortcut :setMultiple`(
            ['^+', (e) => (self.user.__uFontFactor += .05, apply(self.user))],
            ['^-', (e) => (self.user.__uFontFactor -= .05, apply(self.user))],
        );

        º.respond({
            "theme::val": (key) => val(key),
            "theme::px": (key) => px(key),
            "theme :as_px": (key) => as_px(key),
        });

        º.listen({
            "setting :themeUpdated": (theme) => {
                reset_theme();
                set_theme_to(theme);
                º.emit`article :advancedToken`(º.req`article :getActiveToken`());
            },
            "theme :repositionArticle": (article_node) => {
                const invert = () => (Math.random() > .5 ? 1 : -1);

                const main_padding = º.req`theme::px`("--main-padding");
                const { x, y, width: w, height: h } = ƒ("article").getBoundingClientRect();
                const ref = {
                    left: main_padding,
                    top: y + main_padding,
                    width: w - main_padding * 2,
                    height: h - main_padding * 2,
                };

                const article_base_width = º.req`theme :as_px`("--article-base-width");
                const article_width_shift = º.req`theme :as_px`("--article-width-shift");
                const article_base_height = º.req`theme :as_px`("--article-base-height");
                const article_height_shift = º.req`theme :as_px`("--article-height-shift");

                const width = Math.round(Math.min(
                    article_base_width +
                    Math.random() * (invert() * article_width_shift),
                    ref.width
                ));
                const height = Math.round(Math.min(
                    article_base_height +
                    Math.random() * (invert() * article_height_shift),
                    ref.height
                ));
                const left = Math.round(
                    (ref.width - width) / 2 +
                    (invert() * ((ref.width - width) / 2) * Math.random())
                );
                const top = Math.round(
                    (ref.height - height) / 2 +
                    (invert() * ((ref.height - height) / 2) * Math.random())
                );

                apply({
                    __kArticleFrameX: `${ref.left + left}px`,
                    __kArticleFrameY: `${ref.top + top}px`,
                    __kArticleFrameW: `${width}px`,
                    __kArticleFrameH: `${height}px`,
                });
            },
            "article :advancedToken": (node) => {
                const rect = node.getBoundingClientRect();
                apply({
                    __kArticleTokenX: `${node.offsetLeft}px`,
                    __kArticleTokenY: `${node.offsetTop}px`,
                    __kArticleTokenW: `${Math.round(rect.width)}px`,
                    __kArticleTokenH: `${Math.round(rect.height)}px`,
                });
            },
            "article :unloadArticle": () => {
                apply({ __kRandArticleBound: Math.random() });
            },
        });
    }();

    /// Transforms the keys from an object from Camel case to CSS variable names.
    /// `__cssVariable' turns into `--css-variable'.
    ///
    /// [>] x: object{*: string}
    /// [<] object{*: string}
    function transpile(x) {
        return Object.fromEntries(
            Object.entries(x).map(
                ([k, v]) => [k.replace(/^__/, '--')
                              .replace(/([A-Z])/g, '-$1')
                              .toLowerCase(), v]
            )
        );
    }

    /// Returns the extended theme object.
    ///
    /// [>] name: string
    /// [<] object{*: str}
    function compile(name) {
        const theme = transpile(self.themes[name]);
        const parent = theme.extend;

        if (!parent)
            return theme;

        return Object.assign(Object.create(null), compile(parent), theme);
    }

    function reset_theme() {
        Object.entries(compile(self.active_theme))
              .forEach(([key, value]) => self.node.style.removeProperty(key));
    }

    /// Sets the active theme to the given name and applies it.
    ///
    /// [>] name: str
    /// [<] void
    function set_theme_to(name) {
        apply(compile(self.active_theme = name));
    }

    /// Applies the given key value pairs to the html node.
    ///
    /// [>] vars: object{*: str}
    /// [<] void
    function apply(vars) {
        Object.entries(transpile(vars))
              .forEach(([key, value]) => self.node.style.setProperty(key, value));
   }

    /// Returns the raw property value as a string.
    ///
    /// [>] key: str
    /// [<] str
    function val(key) {
        return compile(self.active_theme)[key];
    }

    /// Returns the property as a number.
    ///
    /// [>] key: str
    /// [<] int
    function px(key) {
        return Number(val(key).replace(/px$/, String()));
    }

    /// Returns the property converted to an absolute pixel value.
    ///
    /// [>] key: str
    /// [<] int
    function as_px(key) {
        const [_, v, unit] = val(key).match(/(\d+)(.+)/);

        switch(unit) {
            case "px":
                return +v;
            case "vw":
                return window.innerWidth / 100 * +v;
            case "vh":
                return window.innerHeight / 100 * +v;
            default:
                throw Error(`Unkown unit '${unit}'.`);
        }
    }
}();