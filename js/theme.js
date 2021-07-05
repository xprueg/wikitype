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
                "--articleThumbnailBorder": "2px solid var(--article-image-border-color)",
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
                "--articleExtractFont": "30px/1.25em Inter",
                "--articleExtractFontFeatureSettings": `"ss01", "ss02", "case", "cv10", "cv11"`,
                "--article-image-border-color": "var(--bright)",
                "--token-upcoming-color": "hsla(0, 0%, 100%, 1)",
                "--token-active-color": "hsla(0, 0%, 100%, .5)",
                "--tokenTypedColor": "hsla(0, 0%, 100%, .5)",
                "--tokenActiveBackground": "var(--body-background)",
                /* Nav */
                "--upcoming-option-background": "var(--bright)",
                "--upcoming-option-color": "var(--dark)",
            },
            terminal: {
                "extend": "neon",
                "--dark": "hsl(30, 1.41%, 10.84%)",
                "--bright": "hsl(54.89, 79.66%, 76.86%)",
                "--body-background": "var(--bright)",
                "--global-border-size": "0",
                "--main-background": `
                    radial-gradient(circle at bottom center, hsla(30, 1.41%, 27.84%, .3), transparent),
                    repeating-linear-gradient(
                        180deg,
                        hsla(0, 0%, 0%, .2), hsla(0, 0%, 0%, .2) 2px,
                        transparent 2px, transparent 4px
                    ),
                    repeating-linear-gradient(
                        270deg,
                        hsla(0, 0%, 0%, .2), hsla(0, 0%, 0%, .2) 1px,
                        transparent 1px, transparent 50px
                    ),
                    hsl(30, 1.41%, 10%)
                `,
                "--articleExtractFont": "50px/.8em Monogram",
                "--article-extract-extend-span-height": "true",
                "--token-upcoming-color": "#95ff5f",
                "--tokenActiveBackground": "var(--bright)",
                "--token-active-color": "blue",

                "--article-loading-spinner-color": "#f3eb95",

                "--tokenUpcomingColor": "var(--bright)",
                "--tokenUpcomingBackground": "transparent",
                "--tokenActiveColor": "hsla(54.37, 59.26%, 89.41%, 0.39)",
                "--tokenActiveBackground": "hsla(54.37, 59.26%, 89.41%, 0.04)",
                "--tokenProgressColor": "hsl(30, 1.41%, 27.84%)",
                "--tokenProgressBackground": "#f3eb95",
                "--tokenProgressTextShadow": "0 0 30px #f3eb95",
                "--tokenTypedColor": "hsla(54.37, 59.26%, 89.41%, 0.39)",
                "--tokenTypedBackground": "",
                "--tokenErrorColor": "hsl(360, 100%, 9.25%)",
                "--tokenErrorBackground": "hsl(360, 100%, 59.25%)",

                "--uiButtonBorderRadius": "0",

                "--articleThumbnailBorder": "0",
                "--articleThumbnailMixBlendMode": "luminosity",

                "--articleFrameBackground": `
                    /* top border */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) - var(--kBorderSize))
                        calc(var(--lap) - var(--kBorderSize))/
                        calc(var(--articleFrameWidth) + var(--kBorderSize) * 2)
                        var(--kBorderSize)
                        no-repeat,
                    /* right border */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) + var(--articleFrameWidth))
                        calc(var(--lap) - var(--kBorderSize))/
                        calc(var(--kBorderSize) * 15)
                        calc(var(--articleFrameHeight) + var(--kBorderSize) * 2)
                        no-repeat,
                    /* bottom border */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) - var(--kBorderSize))
                        calc(var(--lap) + var(--articleFrameHeight))/
                        calc(var(--articleFrameWidth) + var(--kBorderSize) * 2)
                        var(--kBorderSize)
                        no-repeat,
                    /* left border */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--lap) - var(--kBorderSize) * 15)
                        calc(var(--lap) - var(--kBorderSize))/
                        calc(var(--kBorderSize) * 15)
                        calc(var(--articleFrameHeight) + var(--kBorderSize) * 2)
                        no-repeat,
                    /* background */
                    linear-gradient(hsla(30, 1.41%, 27.84%, .6), hsla(30, 1.41%, 27.84%, .6))
                        var(--lap) var(--lap)/
                        var(--articleFrameWidth) var(--articleFrameHeight)
                        no-repeat
                `,
            },
        };

        set_theme_to(self.active_theme);

        º.respond({
            "theme::val": (key) => val(key),
            "theme::px": (key) => px(key),
        });

        º.listen({
            // FIXME: Clear all variables from the previously set theme on an update.
            "setting::themeUpdate": (name) => set_theme_to(name),
            "article :resizedTo": (w, h) => {
                apply({
                    "--articleFrameWidth": `${w}px`,
                    "--articleFrameHeight": `${h}px`,
                });
            }
        });
    }();

    /// Returns the extended theme object.
    ///
    /// [>] name: string
    /// [<] object{*: str}
    function compile(name) {
        const theme = self.themes[name];
        const extend = theme.extend;

        if (!extend)
            return theme;

        return Object.assign(Object.create(null), self.themes[extend], theme);
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
        Object.entries(vars)
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
}();