void function ThemeController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ("html");
        self.active_theme = º.req`theme::getDefault`();
        self.themes = {
            neon: {
                /* Custom */
                "--kHandleSize": "10px",
                "--kSmallHandleSize": "3px",
                "--kBorderSize": "2px",
                /* Base */
                "--dark": "black",
                "--bright": "white",
                /* Global */
                "--global-border-size": "2px",
                "--global-border-color": "var(--bright)",
                /* Body */
                "--body-background": "radial-gradient(at 0% 0%, magenta, cyan)",
                /* Main */
                "--main-padding": "20px",
                "--main-background": `
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .03) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .03) 75%, hsla(0, 0%, 100%, .03))
                        0 0/50px 50px,
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .03) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .03) 75%, hsla(0, 0%, 100%, .03))
                        calc(50px / 2) calc(50px / 2)/50px 50px,
                    var(--dark)`,
                /* Article */
                "--article-base-width": "700px",
                "--article-width-shift": "50px",
                "--article-base-height": "400px",
                "--article-height-shift": "50px",
                "--article-loading-spinner-color": "hsl(0, 0%, 100%, .7)",
                /* Article Frame */
                "--articleFrameBackground": `
                    /* top middle handle */
                    radial-gradient(
                        circle at
                            calc(var(--lap) + var(--articleFrameWidth) / 2)
                            calc(var(--lap) + var(--kBorderSize) / 2),
                        var(--bright), var(--bright) var(--kSmallHandleSize), transparent var(--kSmallHandleSize), transparent),
                    /* bottom middle handle */
                    radial-gradient(
                        circle at
                            calc(var(--lap) + var(--articleFrameWidth) / 2)
                            calc(var(--lap) - var(--kBorderSize) / 2 + var(--articleFrameHeight)),
                        var(--bright), var(--bright) var(--kSmallHandleSize), transparent var(--kSmallHandleSize), transparent),
                    /* left middle handle */
                    radial-gradient(
                        circle at
                            calc(var(--lap) + var(--kBorderSize) / 2)
                            calc(var(--lap) + var(--kBorderSize) / 2 + var(--articleFrameHeight) / 2),
                        var(--bright), var(--bright) var(--kSmallHandleSize), transparent var(--kSmallHandleSize), transparent),
                    /* right middle handle */
                    radial-gradient(
                        circle at
                            calc(var(--lap) + var(--articleFrameWidth) - var(--kBorderSize) / 2)
                            calc(var(--lap) + var(--kBorderSize) / 2 + var(--articleFrameHeight) / 2),
                        var(--bright), var(--bright) var(--kSmallHandleSize), transparent var(--kSmallHandleSize), transparent),

                    /* top left handle cutout */
                    linear-gradient(var(--dark), var(--dark))
                        calc(var(--lap) + var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)
                        calc(var(--lap) + var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)/
                        calc(var(--kHandleSize) - var(--kBorderSize) * 2) calc(var(--kHandleSize) - var(--kBorderSize) * 2) no-repeat,
                    /* top left handle */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) + var(--kBorderSize) / 2 - var(--kHandleSize) / 2)
                        calc(var(--lap) + var(--kBorderSize) / 2 - var(--kHandleSize) / 2)/
                        var(--kHandleSize) var(--kHandleSize) no-repeat,
                    /* bottom left handle cutout */
                    linear-gradient(var(--dark), var(--dark))
                        calc(var(--lap) + var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)
                        calc(var(--lap) + var(--articleFrameHeight) - var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)/
                        calc(var(--kHandleSize) - var(--kBorderSize) * 2) calc(var(--kHandleSize) - var(--kBorderSize) * 2) no-repeat,
                    /* bottom left handle */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) + var(--kBorderSize) / 2 - var(--kHandleSize) / 2)
                        calc(var(--lap) + var(--articleFrameHeight) - var(--kBorderSize) / 2 - var(--kHandleSize) / 2)/
                        var(--kHandleSize) var(--kHandleSize) no-repeat,
                    /* top right handle cutout */
                    linear-gradient(var(--dark), var(--dark))
                        calc(var(--lap) + var(--articleFrameWidth) - var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)
                        calc(var(--lap) + var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)/
                        calc(var(--kHandleSize) - var(--kBorderSize) * 2) calc(var(--kHandleSize) - var(--kBorderSize) * 2) no-repeat,
                    /* top right handle */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) + var(--articleFrameWidth) - var(--kBorderSize) / 2 - var(--kHandleSize) / 2)
                        calc(var(--lap) + var(--kBorderSize) / 2 - var(--kHandleSize) / 2)/
                        var(--kHandleSize) var(--kHandleSize) no-repeat,
                    /* bottom right handle cutout */
                    linear-gradient(var(--dark), var(--dark))
                        calc(var(--lap) + var(--articleFrameWidth) - var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)
                        calc(var(--lap) + var(--articleFrameHeight) - var(--kBorderSize) / 2 - (var(--kHandleSize) - var(--kBorderSize) * 2) / 2)/
                        calc(var(--kHandleSize) - var(--kBorderSize) * 2) calc(var(--kHandleSize) - var(--kBorderSize) * 2) no-repeat,
                    /* bottom right handle */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) + var(--articleFrameWidth) - var(--kBorderSize) / 2 - var(--kHandleSize) / 2)
                        calc(var(--lap) + var(--articleFrameHeight) - var(--kBorderSize) / 2 - var(--kHandleSize) / 2)/
                        var(--kHandleSize) var(--kHandleSize) no-repeat,

                    /* top border */
                    linear-gradient(var(--bright), var(--bright))
                        var(--lap) var(--lap)/
                        var(--articleFrameWidth) var(--kBorderSize) no-repeat,
                    /* right border */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) + var(--articleFrameWidth) - var(--kBorderSize)) var(--lap)/
                        var(--kBorderSize) var(--articleFrameHeight) no-repeat,
                    /* bottom border */
                    linear-gradient(var(--bright), var(--bright))
                        var(--lap) calc(var(--lap) + var(--articleFrameHeight) - var(--kBorderSize))/
                        var(--articleFrameWidth) var(--kBorderSize) no-repeat,
                    /* left border */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap)) var(--lap)/
                        var(--kBorderSize) var(--articleFrameHeight) no-repeat
                `,
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
            blackout: {
                /* Base */
                "--dark": "black",
                "--bright": "#cc3736",
                /* Global */
                "--global-border-size": "2px",
                "--global-border-color": "var(--bright)",
                /* Body */
                "--body-background": "radial-gradient(at 0% 0%, magenta, cyan)",
                /* Main */
                "--main-padding": "20px",
                "--main-background": "#cc3736",
                /* Article */
                "--article-base-width": "700px",
                "--article-width-shift": "50px",
                "--article-base-height": "400px",
                "--article-height-shift": "50px",
                "--article-loading-spinner-color": "hsl(0, 0%, 100%, .7)",
                /* Article Frame */
                "--frame-border-size": "2px",
                "--frame-border-color": "#dddcdd",
                "--edge-handle-background": "var(--main-background)",
                "--edge-handle-size": "10px",
                "--middle-handle-background": "var(--frame-border-color)",
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
            // FIXME: Clear all variables from the previously set theme on an update.
            "setting::themeUpdate": (theme) => {
                self.active_theme = theme;
                apply(theme);
            },
            "article :resizedTo": (w, h) => {
                ƒ("html").style.setProperty("--articleFrameWidth", `${w}px`);
                ƒ("html").style.setProperty("--articleFrameHeight", `${h}px`);
            }
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