void function ThemeController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("html");
        self.active_theme = º.req`theme::getDefault`();
        self.themes = {
            neon: {
                /* Base */
                "--dark": "black",
                "--bright": "white",
                /* Global */
                "--global-border-size": "2px",
                "--global-border-color": "var(--dark)",
                /* Body */
                "--body-background": "radial-gradient(at 0% 0%, magenta, cyan)",
                /* Main */
                "--main-padding": "20px",
                "--main-background-color": "var(--dark)",
                "--main-background-image": `
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .03) 25%, transparent 25%,
                        transparent 75%, hsla(0, 0%, 10100%, .03) 75%, hsla(0, 0%, 100%, .03)),
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .03) 25%, transparent 25%,
                        transparent 75%, hsla(0, 0%, 100%, .03) 75%, hsla(0, 0%, 100%, .03))`,
                "--main-background-size": "50px 50px",
                "--main-background-position": "0 0, calc(50px / 2) calc(50px / 2)",
                /* Article */
                "--article-base-width": "700px",
                "--article-width-shift": "50px",
                "--article-base-height": "400px",
                "--article-height-shift": "50px",
                "--article-loading-spinner-color": "hsl(0, 0%, 100%, .7)",
                /* Article Frame */
                "--frame-border-size": "2px",
                "--frame-border-color": "var(--bright)",
                "--edge-handle-background": "var(--dark)",
                "--edge-handle-size": "10px",
                "--middle-handle-background": "var(--bright)",
                "--middle-handle-size": "6px",
                /* Extract */
                "--article-extract-font-family": "Inter",
                "--article-extract-font-feature-settings": `"ss01", "ss02", "case", "cv10", "cv11"`,
                "--article-extract-font-size": "30px",
                "--article-extract-line-height": "40px",
                "--article-image-border-color": "var(--bright)",
                "--token-upcoming-color": "hsla(0, 0%, 100%, 1)",
                "--token-active-color": "hsla(0, 0%, 100%, .5)",
                "--token-typed-color": "hsla(0, 0%, 100%, .5)",
                /* Nav */
                "--upcoming-option-background": "var(--bright)",
                "--upcoming-option-color": "var(--dark)",
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