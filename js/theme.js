void function ThemeController() {
    const self = Object.create(null);

    // FIXME: Do transpile while compiling the theme instead of each on their own.
    function transpile(x) {
        return Object.fromEntries(Object.entries(x)
                                        .map(([k, v]) => [k.replace(/^__/, '--')
                                                           .replace(/([A-Z])/g, '-$1')
                                                           .toLowerCase(), v])
        );
    }

    void function init() {
        self.node = ƒ('html');
        self.active_theme = º.req`theme :getSelected`();
        self.themes = {
            // FIXME: Move <base> outside of themes in separat object.

            base: transpile({
                __asideWidth: '70px',
                __uiButtonBorderRadius: '100px',
                __mainPadding: '20px',
                __lap: '30px',
                __kRandArticleBound: 0,
            }),

            pstr: transpile({
                name:   'Poster',
                extend: 'base',

                // Theme specific
                __cRandomHue: "calc(360 * var(--k-rand-article-bound))",

                // Colors
                __dark:   'hsl(0, 5.71%, 13.73%)',
                __bright: 'hsl(180, 2.22%, 91.18%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground: 'var(--bright)',
                __mainBackground: 'var(--bright)',

                // History
                __historyDark:   'var(--bright)',
                __historyBright: 'var(--dark)',

                // Article
                __articleBaseWidth:           '700px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '800px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'hsl(var(--c-random-hue), 93.98%, 20%)',
                __articleThumbnailBorder:     '2px solid var(--article-image-border-color)',
                __articleFrameBackground: `
                    linear-gradient(
                        0deg,
                        transparent, transparent 50%,
                        hsla(0, 0%, 0%, .04) 50%, hsla(0, 0%, 0%, .02) 52%,
                        hsla(0, 0%, 0%, .01) 60%, transparent),
                    linear-gradient(
                        90deg,
                        transparent, transparent 50%,
                        hsla(0, 0%, 0%, .04) 50%, hsla(0, 0%, 0%, .02) 52%,
                        hsla(0, 0%, 0%, .01) 60%, transparent),
                    hsl(var(--c-random-hue), 93.98%, 67.45%)
                `,

                // Thumbnail
                __articleThumbnailBorder:       '0',
                __articleThumbnailMixBlendMode: 'darken',
                __articleThumbnailFilter:       'grayscale(1)',

                // Extract
                __articleExtractFont:                '32px/1.5em Inter',
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,
                __articleImageBorderColor:           'var(--bright)',

                // Tokens
                __tokenUpcomingColor:      'black',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'hsl(var(--c-random-hue), 93.98%, 76%)',
                __tokenActiveBackground:   'hsla(var(--c-random-hue), 0%, 100%, 0.04)',
                __tokenProgressColor:      'black',
                __tokenProgressBackground: 'rgba(255, 255, 255, 0.5)',
                __tokenProgressTextShadow: 'none',
                __tokenTypedColor:         'hsl(var(--c-random-hue), 93.98%, 76%)',
                __tokenTypedBackground:    'transparent',
                __tokenErrorColor:         'hsl(5.62, 65.75%, 19%)',
                __tokenErrorBackground:    'hsl(5.62, 80%, 49%)',

                // Navigation
                __upcomingOptionBackground: 'var(--bright)',
                __upcomingOptionColor:      'var(--dark)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'soft-light',
                __asideThumbnailFilter:       'grayscale(1)',
            }),

            neon: {
                "name": "Neon",
                "extend": "base",

                /* Custom */
                "--kHandleSize": "10px",
                "--kSmallHandleSize": "3px",
                "--kBorderSize": "2px",
                /* Base */
                "--dark": "black",
                "--bright": "white",
                /* Global */
                "--global-border-size": "0",
                "--global-border-color": "",
                /* Body */
                "--body-background": "var(--bright)",
                /* Main */
                "--main-background": `
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .04) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .04) 75%, hsla(0, 0%, 100%, .04))
                        0 0/50px 50px,
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .04) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .04) 75%, hsla(0, 0%, 100%, .04))
                        calc(50px / 2) calc(50px / 2)/50px 50px,
                    radial-gradient(at 0% 0%, magenta, cyan)`,
                /* Article */
                "--article-base-width": "800px",
                "--article-width-shift": "50px",
                "--article-base-height": "500px",
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
                "--articleExtractFont": "32px/1.5em Inter",
                "--articleExtractFontFeatureSettings": `"ss01", "ss02", "case", "cv10", "cv11"`,
                "--article-image-border-color": "var(--bright)",

                "--tokenUpcomingColor": "var(--bright)",
                "--tokenUpcomingBackground": "transparent",
                "--tokenActiveColor": "hsla(0, 0%, 100%, .2)",
                "--tokenActiveBackground": "hsla(0, 0%, 0%, .1)",
                "--tokenProgressColor": "var(--dark)",
                "--tokenProgressBackground": "var(--bright)",
                "--tokenProgressTextShadow": "0 0 30px #f3eb95",
                "--tokenTypedColor": "hsla(0, 0%, 100%, .2)",
                "--tokenTypedBackground": "",
                "--tokenErrorColor": "hsl(360, 100%, 9.25%)",
                "--tokenErrorBackground": "hsl(360, 100%, 59.25%)",

                /* Nav */
                "--upcoming-option-background": "var(--bright)",
                "--upcoming-option-color": "var(--dark)",
            },
            term: {
                "name": "Terminal",
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
                "--articleExtractFont": "34px/1.5em JetBrains Mono",
                "--token-upcoming-color": "#95ff5f",
                "--tokenActiveBackground": "var(--bright)",
                "--token-active-color": "blue",
                "--article-base-width": "900px",
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

                "--uiButtonBorderRadius": "0px",

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
            "setting :themeUpdated": (theme) => (reset_theme(), set_theme_to(theme)),
            "article :resizedTo": (w, h) => {
                apply({
                    "--article-frame-width": `${w}px`,
                    "--article-frame-height": `${h}px`,
                });
            },
            "article :unloadArticle": () => {
                apply({ "--k-rand-article-bound": Math.random() });
            },
        });
    }();

    /// Returns the extended theme object.
    ///
    /// [>] name: string
    /// [<] object{*: str}
    function compile(name) {
        const theme = self.themes[name];
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