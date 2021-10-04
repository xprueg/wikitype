void function ThemeController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ('html');
        self.active_theme = º.req`theme :getSelected`();

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

        self.themes = {
            base: {
                name: "Base",

                // General
                __mainPadding:       "20px",
                __dark:              "black",
                __bright:            "white",
                __globalBorderSize:  "0px",
                __globalBorderColor: "transparent",
                __bodyBackground:    "var(--bright)",

                // Aside
                __asideWidth:                 "70px",
                __asideColor:                 "var(--dark)",
                __asideThumbnailMixBlendMode: "normal",
                __asideThumbnailFilter:       String(),

                // History
                __historyBase:     "var(--dark)",
                __historyContrast: "var(--bright)",

                // Navigation
                __upcomingOptionHeight:     "80px",
                __upcomingOptionFontSize:   "46px",
                __upcomingOptionBackground: "var(--dark)",
                __upcomingOptionColor:      "var(--bright)",

                // Settings
                __settingsColor:             "var(--dark)",
                __settingsBackground:        "var(--bright)",
                __settingsHeadingColor:      "var(--settings-background)",
                __settingsHeadingBackground: "var(--settings-color)",
                __settingsBorderColor:       "var(--settings-color)",

                // Shortcuts
                __shortcutBackground: "transparent",
                __shortcutText:       "var(--dark)",
                __shortcutBox:        "var(--bright)",

                // Article
                __articlePadding:             0,
                __articleBaseWidth:           "500px",
                __articleWidthShift:          "50px",
                __articleBaseHeight:          "400px",
                __articleHeightShift:         "50px",
                __articleLoadingSpinnerColor: "var(--dark)",
                __articleLoadingSpinnerChars: "-\\|/",
                __articleLoadingSpinnerDelay: 128,

                // Caret
                __articleCaretWidth:  "1px",
                __articleCaretColor:  "var(--dark)",
                __articleCaretScaleY: 1,

                // Background
                __articleFrameBackground: String(),

                // Thumbnail
                __articleThumbnailBorder:       String(),
                __articleThumbnailMixBlendMode: String(),
                __articleThumbnailFilter:       String(),

                // Font
                __articleExtractFont:                "400 30px/1.4em system-ui",
                __articleExtractLetterSpacing:       "normal",
                __articleExtractFontFeatureSettings: String(),

                // Tokens
                __tokenUpcomingColor:      "var(--dark)",
                __tokenUpcomingBackground: "transparent",
                __tokenActiveColor:        "gray",
                __tokenActiveBackground:   "transparent",
                __tokenProgressColor:      "var(--dark)",
                __tokenProgressBackground: "transparent",
                __tokenProgressTextShadow: String(),
                __tokenTypedColor:         "gray",
                __tokenTypedBackground:    "var(--bright)",
                __tokenErrorColor:         "var(--bright)",
                __tokenErrorBackground:    "red",
            },

            zens: {
                name:   'Zensur',
                extend: 'base',

                // Theme specific
                __articlePadding: "0px",

                // Colors
                __dark:   'hsl(220, 9%, 9%)',
                __bright: 'white',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  'var(--bright)',

                // History
                __historyBase:     'hsl(0, 0%, 80%)',
                __historyContrast: 'var(--bright)',

                // Article
                __articleBaseWidth:           '100vw',
                __articleWidthShift:          '0px',
                __articleBaseHeight:          '100vh',
                __articleHeightShift:         '0px',
                __articleLoadingSpinnerColor: 'var(--dark)',
                __articleLoadingSpinnerChars: "→↘↓↘",
                __articleLoadingSpinnerDelay: "360",
                __articleCaretWidth:          '2px',
                __articleCaretColor:          'var(--dark)',
                __articleCaretScaleY:         '1.2',
                __articleFrameBackground:     'none',

                // Thumbnail
                __articleThumbnailBorder:       'none',
                __articleThumbnailMixBlendMode: 'none',
                __articleThumbnailFilter:       '',

                // Extract
                __articleExtractFont:
                    `400 clamp(20px, calc(1vw * 3 * var(--u-font-factor)), 60px)/
                     1.35em GTAmericaLC-ExpRg`,
                __articleExtractLetterSpacing:       "0",
                __articleExtractFontFeatureSettings: '"kern", "liga", "onum", "ss02", "ss03", "ss05"',

                // Tokens
                __tokenUpcomingColor:      'var(--dark)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'transparent',
                __tokenActiveBackground:   `var(--dark)`,
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: 'none',
                __tokenTypedColor:         'transparent',
                __tokenTypedBackground:    `linear-gradient(var(--dark), var(--dark)) 0 0/
                                            calc(100% - 1ex) 100% no-repeat`,
                __tokenErrorColor:         'var(--bright)',
                __tokenErrorBackground:    'var(--dark)',

                // Navigation
                __upcomingOptionBackground: 'var(--dark)',
                __upcomingOptionColor:      'var(--bright)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'normal',
                __asideThumbnailFilter:       'opacity(.3) contrast(4)',
            },

            note: {
                name:   'Note',
                extend: 'base',

                // Theme specific
                __articlePadding: "50px",

                // Colors
                __dark:   'hsl(56.47, 87.79%, 12.51%)',
                __bright: 'hsl(56.47, 8.1%, 55.93%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  'var(--bright)',

                // History
                __historyBase:     'var(--dark)',
                __historyContrast: 'var(--bright)',

                // Article
                __articleBaseWidth:           '700px',
                __articleWidthShift:          '0px',
                __articleBaseHeight:          '700px',
                __articleHeightShift:         '0px',
                __articleLoadingSpinnerColor: 'hsl(56, 86%, 15%)',
                __articleFrameBackground: `
                    linear-gradient(
                        135deg,
                        var(--bright), var(--bright) 50%, hsla(0, 0%, 0%, .2) 50%)
                        var(--k-article-frame-x) var(--k-article-frame-y)/
                        calc(var(--article-padding) * .5) calc(var(--article-padding) * .5)
                        no-repeat,
                    linear-gradient(
                        hsl(56, 98%, 59%), hsl(56, 98%, 59%))
                        var(--k-article-frame-x) var(--k-article-frame-y)/
                        var(--k-article-frame-w)
                        calc(var(--k-article-frame-h) - var(--article-padding))
                        no-repeat,
                    linear-gradient(
                        hsla(0, 0%, 0%, .2), hsla(0, 0%, 0%, .2))
                        calc(var(--k-article-frame-x) + 10px) calc(var(--k-article-frame-y) + 10px)/
                        var(--k-article-frame-w)
                        calc(var(--k-article-frame-h) - var(--article-padding))
                        no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       '0',
                __articleThumbnailMixBlendMode: 'darken',
                __articleThumbnailFilter:       'grayscale(1)',

                // Extract
                __articleExtractFont:                'calc(34px * var(--u-font-factor))/1.4em Grafier-Regular',
                __articleExtractFontFeatureSettings: '"ss02"',

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
            },

            neon: {
                name:   'Neon',
                extend: 'base',

                // Theme specific
                __cHandleSize:      '4.5px',
                __chs:              'var(--c-handle-size)',
                __cSmallHandleSize: '2px',
                __cBorderSize:      '2px',
                __cbs:              'var(--c-border-size)',
                __cfx:              'var(--k-article-frame-x)',
                __cfy:              'var(--k-article-frame-y)',
                __cfw:              'var(--k-article-frame-w)',
                __cfh:              'var(--k-article-frame-h)',

                // Colors
                __dark:   'black',
                __bright: 'white',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground: `
                    linear-gradient(90deg,
                        var(--bright), var(--bright) var(--aside-width),
                        transparent var(--aside-width)),
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

                // History
                __historyBase:     'var(--bright)',
                __historyContrast: 'var(--dark)',

                // Article
                __articlePadding: "30px",
                __articleBaseWidth:           '800px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '500px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'hsl(0, 0%, 100%, .7)',
                __articleCaretWidth:          '0',
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
                            calc(var(--cfy) + var(--cfh) + var(--cbs) / 2 - var(--article-padding)),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* BOTTOM RIGHT HANDLE */
                    radial-gradient(
                        circle at calc(
                            var(--cfx) + var(--cfw) - var(--cbs) / 2)
                            calc(var(--cfy) + var(--cfh) + var(--cbs) / 2 - var(--article-padding)),
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
                        var(--c-border-size) calc(var(--cfh) - var(--chs) * 2 + var(--cbs) - var(--article-padding)) no-repeat,
                    /* BORDER BOTTOM */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--chs) + var(--cfx)) calc(var(--cfy) + var(--cfh) - var(--article-padding))/
                        calc(var(--cfw) - var(--chs) * 2) var(--c-border-size) no-repeat,
                    /* BORDER LEFT */
                    linear-gradient(var(--bright), var(--bright))
                        var(--cfx) calc(var(--chs) + var(--cfy))/
                        var(--c-border-size) calc(var(--cfh) - var(--chs) * 2 + var(--cbs) - var(--article-padding)) no-repeat
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

                // Shortcuts
                __shortcutBackground: 'var(--bright)',
            },

            term: {
                name:   'Terminal',
                extend: 'base',

                // Theme specific
                __articlePadding: '0px',

                // Colors
                __dark:   'hsl(80, 55%, 8%)',
                __bright: 'hsl(83, 97%, 58%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground: `
                    linear-gradient(90deg,
                        var(--dark), var(--dark) var(--aside-width),
                        transparent var(--aside-width)),
                    radial-gradient(circle at center center,
                       var(--dark), transparent),
                    hsl(80, 35%, 8%)
                `,

                // Aside
                __asideColor:      'var(--bright)',

                // Settings
                __settingsBackground: 'var(--dark)',
                __settingsColor:      'var(--bright)',
                __settingsBorderColor: 'var(--bright)',
                __settingsHeadingColor: "var(--dark)",
                __settingsHeadingBackground: "var(--bright)",

                // History
                __historyBase:     'var(--bright)',
                __historyContrast: 'var(--dark)',

                // Article
                __articleBaseWidth:           '900px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '500px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'var(--bright)',
                __articleLoadingSpinnerChars: "░ ▒ ",
                __articleLoadingSpinnerDelay: "512",
                __articleCaretWidth:          '0',
                __cW: "200px",
                __cH: "100px",
                __cC: "hsl(83, 97%, 20%)",
                __articleFrameBackground: `
                    linear-gradient(-26.5deg,
                        transparent, transparent calc(50% - 2px), var(--c-c) 50%,
                        transparent calc(50% + 2px), transparent
                    ) var(--k-article-frame-x) var(--k-article-frame-y)/
                        calc(var(--c-w) * 2) var(--c-h),
                    linear-gradient(-26.5deg,
                        transparent, transparent calc(50% - 2px), var(--c-c) 50%,
                        transparent calc(50% + 2px), transparent
                    ) var(--k-article-frame-x) var(--k-article-frame-y)/var(--c-w) var(--c-h),
                    linear-gradient(
                        var(--c-c) 1px, transparent 1px)
                        var(--k-article-frame-x) var(--k-article-frame-y)/var(--c-w) var(--c-h),
                    linear-gradient(90deg,
                        var(--c-c) 1px, transparent 1px)
                        var(--k-article-frame-x) var(--k-article-frame-y)/var(--c-w) var(--c-h),
                    linear-gradient(var(--c-c), var(--c-c))
                        0 0/1px 100%
                        no-repeat,
                    linear-gradient(var(--c-c), var(--c-c))
                        100% 0/1px 100%
                        no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       'solid 1px var(--bright)',
                __articleThumbnailMixBlendMode: 'color-dodge',
                __articleThumbnailFilter:       'grayscale(0)',

                // Extract
                __articleExtractFont:                `calc(30px * var(--u-font-factor))/
                                                      1.5em "JetBrains Mono", monospace`,
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,

                // Tokens
                __tokenUpcomingColor:      'var(--dark)',
                __tokenUpcomingBackground: 'var(--bright)',
                __tokenActiveColor:        'hsla(83, 25%, 16.4%, 0.92)',
                __tokenActiveBackground:   `linear-gradient(var(--bright), var(--bright))
                                                0 100%/100% 50% no-repeat,
                                            linear-gradient(var(--dark), var(--dark))
                                                0 0/100% 100% no-repeat`,
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: '',
                __tokenTypedColor:         'var(--token-active-color)',
                __tokenTypedBackground:    `linear-gradient(
                                                var(--bright), var(--bright))
                                                0 100%/100% 0% no-repeat,
                                            linear-gradient(
                                                var(--dark), var(--dark))
                                                0 0/100% 100% no-repeat`,
                __tokenErrorColor:         'hsl(0, 100%, 9.43%)',
                __tokenErrorBackground:    `linear-gradient(
                                                hsl(0, 97%, 58%),
                                                hsl(0, 97%, 58%) 50%,
                                                hsl(15, 97%, 59%) 50%)`,

                // Navigation
                __upcomingOptionBackground: 'var(--bright)',
                __upcomingOptionColor:      'var(--dark)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'soft-light',
                __asideThumbnailFilter:       'grayscale(1)',

                // Shortcuts
                __shortcutText:       'var(--bright)',
                __shortcutBox:        'var(--dark)',
            },
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