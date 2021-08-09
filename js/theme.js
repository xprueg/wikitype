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
        // Variables that can be controlled by the user.
        self.user = {
            __uFontFactor: 1,
        };
        self.themes = {
            base: transpile({
                __asideWidth: '70px',
                __uiButtonBorderRadius: '100px',
                __mainPadding: '20px',
                __lap: '30px',
                __articleExtractLetterSpacing: 'normal',
                __kRandArticleBound: 0,

                // Navigation
                __upcomingOptionHeight:     '80px',
                __upcomingOptionFontSize:   '46px',
            }),

            zens: transpile({
                name:   'Zensur',
                extend: 'base',

                // Theme specific
                __lap: "0px",

                // Colors
                __dark:   'hsl(220, 9%, 9%)',
                __bright: 'white',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  'var(--bright)',
                __asideBackground: 'var(--bright)',

                // History
                __historyBase:     'hsl(0, 0%, 80%)',
                __historyContrast: 'var(--bright)',

                // Article
                __articleBaseWidth:           '100vw',
                __articleWidthShift:          '0px',
                __articleBaseHeight:          '100vh',
                __articleHeightShift:         '0px',
                __articleLoadingSpinnerColor: 'var(--dark)',
                __articleCaretColor:          'var(--bright)',
                __articleFrameBackground:     'none',

                // Thumbnail
                __articleThumbnailBorder:       'none',
                __articleThumbnailMixBlendMode: 'none',
                __articleThumbnailFilter:       '',

                // Extract
                __articleExtractFont:                '400 calc((1vw * 3.2) * var(--u-font-factor))/1.42em Inter',
                __articleExtractLetterSpacing:       '-0.016em',
                __articleExtractFontFeatureSettings: '"ss01", "ss02", "case", "cv10", "cv11"',

                // Tokens
                __tokenUpcomingColor:      'var(--dark)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'transparent',
                __tokenActiveBackground:   'var(--dark)',
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: 'none',
                __tokenTypedColor:         'transparent',
                __tokenTypedBackground:    'var(--dark)',
                __tokenErrorColor:         'var(--bright)',
                __tokenErrorBackground:    'var(--dark)',

                // Navigation
                __upcomingOptionBackground: 'var(--dark)',
                __upcomingOptionColor:      'var(--bright)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'hard-light',
                __asideThumbnailFilter:       'grayscale(1) contrast(.1)',
            }),

            note: transpile({
                name:   'Note',
                extend: 'base',

                // Theme specific
                __lap: "50px",

                // Colors
                __dark:   'hsl(56.47, 87.79%, 12.51%)',
                __bright: 'hsl(56.47, 8.1%, 55.93%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  'var(--bright)',
                __asideBackground: 'var(--bright)',

                // History
                __historyBase:     'var(--dark)',
                __historyContrast: 'var(--bright)',

                // Article
                __articleBaseWidth:           '700px',
                __articleWidthShift:          '0px',
                __articleBaseHeight:          '700px',
                __articleHeightShift:         '0px',
                __articleLoadingSpinnerColor: 'hsl(56, 86%, 15%)',
                __articleCaretColor:          'black',
                __articleFrameBackground: `
                    linear-gradient(
                        135deg,
                        var(--bright), var(--bright) 50%, hsla(0, 0%, 0%, .2) 50%)
                        var(--article-frame-x) var(--article-frame-y)/
                        calc(var(--lap) * .5) calc(var(--lap) * .5)
                        no-repeat,
                    linear-gradient(
                        hsl(56, 98%, 59%), hsl(56, 98%, 59%))
                        var(--article-frame-x) var(--article-frame-y)/
                        var(--article-frame-width)
                        var(--article-frame-height)
                        no-repeat,
                    linear-gradient(
                        hsla(0, 0%, 0%, .2), hsla(0, 0%, 0%, .2))
                        calc(var(--article-frame-x) + 10px) calc(var(--article-frame-y) + 10px)/
                        var(--article-frame-width)
                        var(--article-frame-height)
                        no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       '0',
                __articleThumbnailMixBlendMode: 'darken',
                __articleThumbnailFilter:       'grayscale(1)',

                // Extract
                __articleExtractFont:                'calc(34px * var(--u-font-factor))/1.38em Inter',
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,

                // Tokens
                __tokenUpcomingColor:      'hsl(56, 86%, 15%)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'hsl(56, 89%, 58%)',
                __tokenActiveBackground:   'transparent',
                __tokenProgressColor:      'hsl(56, 86%, 15%)',
                __tokenProgressBackground: 'hsl(56, 100%, 85%)',
                __tokenProgressTextShadow: 'none',
                __tokenTypedColor:         'hsl(56, 89%, 58%)',
                __tokenTypedBackground:    'transparent',
                __tokenErrorColor:         'hsl(13.06, 78.57%, 48.44%)',
                __tokenErrorBackground:    'hsla(26.11, 88.68%, 17.22%, 1)',

                // Navigation
                __upcomingOptionBackground: 'var(--dark)',
                __upcomingOptionColor:      'var(--bright)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'soft-light',
                __asideThumbnailFilter:       'grayscale(1)',
            }),

            neon: transpile({
                name:   'Neon',
                extend: 'base',

                // Theme specific
                __cHandleSize:      '4.5px',
                __chs:              'var(--c-handle-size)',
                __cSmallHandleSize: '2px',
                __cBorderSize:      '2px',
                __cbs:              'var(--c-border-size)',
                __cfx:              'var(--article-frame-x)',
                __cfy:              'var(--article-frame-y)',
                __cfw:              'var(--article-frame-width)',
                __cfh:              'var(--article-frame-height)',

                // Colors
                __dark:   'black',
                __bright: 'white',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground: `
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .04) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .04) 75%, hsla(0, 0%, 100%, .04))
                        0 0/50px 50px,
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .04) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .04) 75%, hsla(0, 0%, 100%, .04))
                        calc(50px / 2) calc(50px / 2)/50px 50px,
                    radial-gradient(at 0% 0%, magenta, cyan)
                `,
                __asideBackground: 'var(--bright)',

                // History
                __historyBase:     'var(--bright)',
                __historyContrast: 'var(--dark)',

                // Article
                __articleBaseWidth:           '800px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '500px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'hsl(0, 0%, 100%, .7)',
                __articleCaretColor:          'black',
                __articleFrameBackground: `
                    /* TOP LEFT HANDLE */
                    radial-gradient(
                        circle at
                            calc(var(--cfx) + var(--cbs) / 2)
                            calc(var(--cfy) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* TOP RIGHT HANDLE */
                    radial-gradient(
                        circle at calc(
                            var(--cfx) + var(--cfw) - var(--cbs) / 2)
                            calc(var(--cfy) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* BOTTOM LEFT HANDLE */
                    radial-gradient(
                        circle at
                            calc(var(--cfx) + var(--cbs) / 2)
                            calc(var(--cfy) + var(--cfh) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* BOTTOM RIGHT HANDLE */
                    radial-gradient(
                        circle at calc(
                            var(--cfx) + var(--cfw) - var(--cbs) / 2)
                            calc(var(--cfy) + var(--cfh) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),

                    /* BORDER TOP */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--chs) + var(--cfx)) var(--cfy)/
                        calc(var(--cfw) - var(--chs) * 2) var(--c-border-size) no-repeat,
                    /* BORDER RIGHT */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--cfx) + var(--cfw) - var(--c-border-size))
                        calc(var(--chs) + var(--cfy))/
                        var(--c-border-size) calc(var(--cfh) - var(--chs) * 2 + var(--cbs)) no-repeat,
                    /* BORDER BOTTOM */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--chs) + var(--cfx)) calc(var(--cfy) + var(--cfh))/
                        calc(var(--cfw) - var(--chs) * 2) var(--c-border-size) no-repeat,
                    /* BORDER LEFT */
                    linear-gradient(var(--bright), var(--bright))
                        var(--cfx) calc(var(--chs) + var(--cfy))/
                        var(--c-border-size) calc(var(--cfh) - var(--chs) * 2 + var(--cbs)) no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       '2px solid var(--article-image-border-color)',
                __articleThumbnailMixBlendMode: '',
                __articleThumbnailFilter:       '',

                // Extract
                __articleExtractFont:                'calc(32px * var(--u-font-factor))/1.5em Inter',
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,

                // Tokens
                __tokenUpcomingColor:      'var(--bright)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'hsla(0, 0%, 100%, .2)',
                __tokenActiveBackground:   'hsla(0, 0%, 0%, .1)',
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: '0 0 30px #f3eb95',
                __tokenTypedColor:         'hsla(0, 0%, 100%, .2)',
                __tokenTypedBackground:    'transparent',
                __tokenErrorColor:         'hsl(360, 100%, 9.25%)',
                __tokenErrorBackground:    'hsl(360, 100%, 59.25%)',

                // Navigation
                __upcomingOptionBackground: 'var(--bright)',
                __upcomingOptionColor:      'var(--dark)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'difference',
                __asideThumbnailFilter:       '',
            }),

            term: transpile({
                name:   'Terminal',
                extend: 'base',

                // Override
                __uiButtonBorderRadius: '0',

                // Theme specific
                __cBorderSize:      '2px',
                __cLargeBorderSize: '30px',

                // Colors
                __dark:   'hsl(30, 1.41%, 10.84%)',
                __bright: 'hsl(54.89, 79.66%, 76.86%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  `
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
                __asideBackground: 'var(--bright)',

                // History
                __historyBase:     'var(--bright)',
                __historyContrast: 'var(--dark)',

                // Article
                __articleBaseWidth:           '900px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '500px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'hsl(54.89, 79.66%, 76.86%)',
                __articleCaretColor:          'transparent',
                __articleFrameBackground: `
                    /* BORDER TOP */
                    linear-gradient(var(--bright), var(--bright))
                        var(--article-frame-x) var(--article-frame-y)/
                        var(--article-frame-width)
                        var(--c-border-size)
                        no-repeat,
                    /* BORDER RIGHT */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--article-frame-x) + var(--article-frame-width) - var(--c-border-size))
                        calc(var(--article-frame-y))/
                        var(--c-large-border-size)
                        calc(var(--article-frame-height) + var(--c-border-size))
                        no-repeat,
                    /* BORDER BOTTOM */
                    linear-gradient(var(--bright), var(--bright))
                        var(--article-frame-x)
                        calc(var(--article-frame-y) + var(--article-frame-height))/
                        var(--article-frame-width)
                        var(--c-border-size)
                        no-repeat,
                    /* BORDER LEFT */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--article-frame-x) - var(--c-large-border-size))
                        calc(var(--article-frame-y))/
                        var(--c-large-border-size)
                        calc(var(--article-frame-height) + var(--c-border-size))
                        no-repeat,
                    /* BACKGROUND */
                    linear-gradient(hsla(30, 1%, 28%, .6), hsla(30, 1%, 28%, .5), hsla(30, 1%, 28%, .6))
                        var(--article-frame-x) var(--article-frame-y)/
                        var(--article-frame-width) var(--article-frame-height)
                        no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       '0',
                __articleThumbnailMixBlendMode: 'luminosity',
                __articleThumbnailFilter:       '',

                // Extract
                __articleExtractFont:                'calc(30px * var(--u-font-factor))/1.5em "JetBrains Mono", monospace',
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,

                // Tokens
                __tokenUpcomingColor:      'var(--bright)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'hsla(54.37, 59.26%, 89.41%, 0.39)',
                __tokenActiveBackground:   'hsla(54.37, 59.26%, 89.41%, 0.04)',
                __tokenProgressColor:      'hsl(30, 1.41%, 27.84%)',
                __tokenProgressBackground: 'hsl(54.89, 79.66%, 76.86%)',
                __tokenProgressTextShadow: '0 0 30px hsl(54.89, 79.66%, 76.86%)',
                __tokenTypedColor:         'hsla(54.37, 59.26%, 89.41%, 0.39)',
                __tokenTypedBackground:    'transparent',
                __tokenErrorColor:         'hsl(360, 100%, 9.25%)',
                __tokenErrorBackground:    'hsl(360, 100%, 59.25%)',

                // Navigation
                __upcomingOptionBackground: 'var(--bright)',
                __upcomingOptionColor:      'var(--dark)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'soft-light',
                __asideThumbnailFilter:       'grayscale(1)',
            }),
        };

        set_theme_to(self.active_theme);
        apply(transpile(self.user));

        º.emit`shortcut :setMultiple`(
            ['^+', (e) => (self.user.__uFontFactor += .05, apply(transpile(self.user)))],
            ['^-', (e) => (self.user.__uFontFactor -= .05, apply(transpile(self.user)))],
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
            "article :resizedTo": (x, y, w, h) => {
                apply({
                    "--article-frame-x": `${x}`,
                    "--article-frame-y": `${y}`,
                    "--article-frame-width": `${w}`,
                    "--article-frame-height": `${h}`,
                });
            },
            "article :advancedToken": (node) => {
                apply({
                    "--k-article-token-x": `${node.offsetLeft}px`,
                    "--k-article-token-y": `${node.offsetTop}px`,
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