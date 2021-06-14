void function ThemeController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("html");
        self.active_theme = º.req`theme::getDefault`();
        self.themes = {
            neon: {
                "--body-background": "radial-gradient(at 0% 0%, magenta, cyan)",
                "--global-border-size": "2px",
                "--global-border-color": "black",
                "--main-padding": "20px",
                "--article-base-width": "700px",
                "--article-width-shift": "50px",
                "--article-base-height": "400px",
                "--article-height-shift": "50px",
                "--main-background-color": "white",
                "--main-background-image": `
                    linear-gradient(45deg,
                        hsla(0, 0%, 0%, .05) 25%, transparent 25%,
                        transparent 75%, hsla(0, 0%, 0%, .05) 75%, hsla(0, 0%, 0%, .05)),
                    linear-gradient(45deg,
                        hsla(0, 0%, 0%, .05) 25%, transparent 25%,
                        transparent 75%, hsla(0, 0%, 0%, .05) 75%, hsla(0, 0%, 0%, .05))`,
                "--main-background-size": "40px 40px",
                "--main-background-position": "0 0, calc(40px / 2) calc(40px / 2)",
            },
        };

        apply(self.active_theme);

        º.respond({
            "theme::val": (key) => val(key),
            "theme::px": (key) => px(key),
        });

        º.listen({
            "setting::themeUpdate": (theme) => {
                self.active_theme = theme;
                apply(theme);
            },
        });
    }();

    /// Applies the values from the given theme to the html node.
    ///
    /// [>] theme := string
    /// [<] void
    function apply(theme) {
        Object.entries(self.themes[theme])
              .forEach(([key, value]) => self.node.style.setProperty(key, value));
   }

    /// Returns the raw property value as a string.
    ///
    /// [>] key := string
    /// [<] string
    function val(key) {
        return self.themes[self.active_theme][key];
    }

    /// Returns the property as a number.
    ///
    /// [>] key := string
    /// [<] int
    function px(key) {
        return Number(val(key).replace(/px$/, String()));
    }
}();