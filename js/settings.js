void function SettingsController() {
    const self = Object.create(null);

    !function init() {
        self.node = ƒ("#settings");
        self.status_bar = ƒ("#settingsStatus");
        self.settings = {
            language: {
                type: "checkbox",
                display_limit: 3,
                default_option: "en",
                options: {
                    en: { name: "English" },
                    ru: { name: "Русский" },
                    uk: { name: "Українська" },
                    de: { name: "Deutsch" },
                    nl: { name: "Nederlands" },
                    lb: { name: "Lëtzebuergesch" },
                    fr: { name: "Français" },
                    cs: { name: "Čeština" },
                    pl: { name: "Język polski" },
                    it: { name: "Italiano" },
                    da: { name: "Dansk" },
                    sv: { name: "Svenska" },
                    no: { name: "Norsk" },
                    fi: { name: "Suomi" },
                    es: { name: "Español" },
                    sl: { name: "Slovenski jezik" },
                    hr: { name: "Hrvatski jezik" },
                    ro: { name: "Română" },
                    lt: { name: "Lietuvių kalba" },
                    be: { name: "Беларуская мова" },
                    lv: { name: "Latviešu valoda" },
                    lt: { name: "Lietuvių kalba" },
                    tr: { name: "Türkçe" },
                    ga: { name: "Gaeilge" },
                    mk: { name: "Macedonian" },
                    sw: { name: "Kiswahili" },
                    cy: { name: "Welsh" },
                    bg: { name: "Български език" },
                },
            },
            theme: {
                type: "radio",
                default_option: "zens",
                options: {
                    base: {
                        name: "Base",
                        id:   "base",

                        // General
                        __mainPadding:       "20px",
                        __dark:              "black",
                        __bright:            "white",
                        __globalBorderSize:  "0px",
                        __globalBorderColor: "transparent",
                        __bodyBackground:    "__bright",

                        // Aside
                        __asideWidth:                 "70px",
                        __asideColor:                 "__dark",
                        __asideThumbnailMixBlendMode: "normal",
                        __asideThumbnailFilter:       "none",

                        // History
                        __historyBase:     "__dark",
                        __historyContrast: "__bright",

                        // Navigation
                        __upcomingOptionHeight:     "80px",
                        __upcomingOptionFontSize:   "46px",
                        __upcomingOptionBackground: "__dark",
                        __upcomingOptionColor:      "__bright",

                        // Settings
                        __settingsColor:             "__dark",
                        __settingsBackground:        "__bright",
                        __settingsHeadingColor:      "__settingsBackground",
                        __settingsHeadingBackground: "__settingsColor",
                        __settingsBorderColor:       "__settingsColor",
                        __settingsBoxShadow:         "0 0 100px 10px __dark",

                        // Shortcuts
                        __shortcutBackground: "transparent",
                        __shortcutText:       "__dark",
                        __shortcutBox:        "__bright",

                        // Article
                        // FIXME: Allow to set each value separately.
                        __articlePadding:             0,
                        __articleBaseWidth:           "500px",
                        __articleWidthShift:          "50px",
                        __articleBaseHeight:          "400px",
                        __articleHeightShift:         "50px",
                        __articleBottomClip:          "0",
                        __articleLoadingSpinnerColor: "__dark",
                        __articleLoadingSpinnerChars: "-\\|/",
                        __articleLoadingSpinnerDelay: 128,

                        // Caret
                        __articleCaretWidth:  "1px",
                        __articleCaretColor:  "__dark",
                        __articleCaretScaleY: 1,

                        // Background
                        __articleFrameBackground: "none",

                        // Thumbnail
                        __articleThumbnailBorder:       "1px solid __dark",
                        __articleThumbnailMixBlendMode: "normal",
                        __articleThumbnailFilter:       "none",

                        // Font
                        __articleExtractFont:                "400 30px/1.4em system-ui",
                        __articleExtractLetterSpacing:       "normal",
                        __articleExtractFontFeatureSettings: "normal",

                        // Tokens
                        __tokenUpcomingColor:      "__dark",
                        __tokenUpcomingBackground: "transparent",
                        __tokenActiveColor:        "gray",
                        __tokenActiveBackground:   "transparent",
                        __tokenProgressColor:      "__dark",
                        __tokenProgressBackground: "transparent",
                        __tokenProgressTextShadow: "none",
                        __tokenTypedColor:         "gray",
                        __tokenTypedBackground:    "__bright",
                        __tokenErrorColor:         "__bright",
                        __tokenErrorBackground:    "red",
                        __tokenOffsetTop:          "0px",
                    },
                    zens: {
                        name:   "Zensur",
                        id:     "zens",
                        extend: "base",

                        // General
                        __dark:            "hsl(220, 9%, 9%)",
                        __bright:          "white",
                        __bodyBackground:  "__bright",

                        // Aside
                        __asideThumbnailFilter: "opacity(.3) contrast(4)",

                        // History
                        __historyBase:     "hsl(0, 0%, 80%)",
                        __historyContrast: "__bright",

                        // Article
                        __articleBaseWidth:           "100vw",
                        __articleWidthShift:          "0px",
                        __articleBaseHeight:          "100vh",
                        __articleHeightShift:         "0px",
                        __articleLoadingSpinnerChars: "→↘↓↘",
                        __articleLoadingSpinnerDelay: 360,

                        // Caret
                        __articleCaretWidth:  "2px",
                        __articleCaretScaleY: 1.2,

                        // Thumbnail
                        __articleThumbnailBorder: "0px solid transparent",

                        // Font
                        __articleExtractFont: `400 clamp(20px, calc(1vw * 3 * __uFontSizeScaling), 60px)/
                                               1.35em GTAmericaLC-ExpRg`,
                        __articleExtractFontFeatureSettings: `'kern', 'liga', 'onum',
                                                              'ss02', 'ss03', 'ss05'`,

                        // Tokens
                        __tokenActiveColor:        "transparent",
                        __tokenActiveBackground:   "__dark",
                        __tokenProgressColor:      "__dark",
                        __tokenProgressBackground: "__bright",
                        __tokenTypedColor:         "transparent",
                        __tokenTypedBackground:    `linear-gradient(__dark, __dark)
                                                    0 0/calc(100% - .90ex) 100% no-repeat`,
                        __tokenErrorColor:         "__bright",
                        __tokenErrorBackground:    "__dark",
                    },
                    note: {
                        name:   "Note",
                        id:     "note",
                        extend: "base",

                        // Custom
                        __dropShadowSize: "10px",
                        __frameX: "__kArticleFrameX",
                        __frameY: "__kArticleFrameY",
                        __frameW: "__kArticleFrameW",
                        __frameH: "__kArticleFrameH",

                        // General
                        __dark:   "hsl(56, 87%, 13%)",
                        __bright: "hsl(56, 8%, 56%)",

                        // Aside
                        __asideThumbnailMixBlendMode: "soft-light",
                        __asideThumbnailFilter:       "grayscale(1)",

                        // Article
                        __articlePadding:             "50px",
                        __articleBaseWidth:           "700px",
                        __articleWidthShift:          "0px",
                        __articleBaseHeight:          "700px",
                        __articleHeightShift:         "0px",
                        __articleLoadingSpinnerColor: "hsl(56, 86%, 15%)",

                        // Background
                        __articleFrameBackground: `
                            linear-gradient(
                                135deg,
                                __bright, __bright 50%, hsla(0, 0%, 0%, .2) 50%)
                                __frameX __frameY/
                                calc(__articlePadding * .5)
                                calc(__articlePadding * .5)
                                no-repeat,
                            linear-gradient(
                                hsl(56, 98%, 59%), hsl(56, 98%, 59%))
                                __frameX __frameY/__frameW __frameH
                                no-repeat,
                            linear-gradient(
                                hsla(0, 0%, 0%, .2), hsla(0, 0%, 0%, .2))
                                calc(__frameX + __dropShadowSize)
                                calc(__frameY + __dropShadowSize)/
                                __frameW __frameH
                                no-repeat
                        `,

                        // Thumbnail
                        __articleThumbnailBorder:       "0px solid transparent",
                        __articleThumbnailMixBlendMode: "darken",
                        __articleThumbnailFilter:       "grayscale(1)",

                        // Font
                        __articleExtractFont: `calc(34px * __uFontSizeScaling)/
                                               1.4em Grafier-Regular`,
                        __articleExtractFontFeatureSettings: "'ss02'",

                        // Tokens
                        __tokenUpcomingColor:      "hsl(56, 86%, 15%)",
                        __tokenUpcomingBackground: "transparent",
                        __tokenActiveColor:        "hsl(56, 89%, 58%)",
                        __tokenActiveBackground:   "transparent",
                        __tokenProgressColor:      "hsl(56, 86%, 15%)",
                        __tokenProgressBackground: "hsl(56, 100%, 85%)",
                        __tokenTypedColor:         "hsl(56, 89%, 58%)",
                        __tokenTypedBackground:    "transparent",
                        __tokenErrorColor:         "hsl(13, 78%, 48%)",
                        __tokenErrorBackground:    "hsl(26, 88%, 17%)",
                    },
                    alph: {
                        name:   "Alpha",
                        id:     "alph",
                        extend: "base",

                        // Custom
                        __cBorderSize:      "2px",
                        __cHalfBorderSize:  "calc(__cBorderSize / 2)",
                        __cHandleSize:      "8px",
                        __cHalfHandleSize:  "calc(__cHandleSize / 2)",
                        __cSmallHandleSize: "calc(__cHandleSize - __cBorderSize * 2)",

                        __frameX: "__kArticleFrameX",
                        __frameY: "__kArticleFrameY",
                        __frameW: "__kArticleFrameW",
                        __frameH: "__kArticleFrameH",

                        // General
                        __dark:   "white",
                        __bright: "black",
                        __bodyBackground: `
                            // LEFT STATIC GUIDE
                            linear-gradient(magenta, magenta)
                                __asideWidth 0/1px 100vh no-repeat,
                            // RIGHT STATIC GUIDE
                            linear-gradient(magenta, magenta)
                                calc(100vw - __asideWidth - 1px) 0/1px 100vh no-repeat,

                            // TOP ARTICLE GUIDE
                            linear-gradient(cyan, cyan)
                                0 __frameY/100vw 1px no-repeat,
                            // LEFT ARTICLE GUIDE
                            linear-gradient(cyan, cyan)
                                __frameX 0/1px 100vh no-repeat,
                            // BOTTOM ARTICLE GUIDE
                            linear-gradient(cyan, cyan)
                                0 calc(__frameY + __frameH - 1px)/100vw 1px no-repeat,
                            // RIGHT ARTICLE GUIDE
                            linear-gradient(cyan, cyan)
                                calc(__frameX + __frameW - 1px) 0/1px 100vh no-repeat,

                            // CHECKER BACKGROUND
                            linear-gradient(45deg,
                                hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
                                hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
                                50% 50%/50px 50px,
                            linear-gradient(45deg,
                                hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
                                hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
                                calc(50% + 50px / 2) calc(50% + 50px / 2)/50px 50px,
                            radial-gradient(at 0% 0%, white, white)
                        `,

                        // Aside
                        __asideColor:                 "__bright",
                        __asideThumbnailMixBlendMode: "difference",

                        // History
                        __historyBase:     "__bright",
                        __historyContrast: "__dark",

                        // Navigation
                        __upcomingOptionBackground: "__bright",
                        __upcomingOptionColor:      "__dark",

                        // Settings
                        __settingsColor: "__bright",
                        __settingsBackground: `
                            // TOP ARTICLE GUIDE
                            linear-gradient(cyan, cyan)
                                0 __frameY/100vw 1px no-repeat,
                            // BOTTOM ARTICLE GUIDE
                            linear-gradient(cyan, cyan)
                                0 calc(__frameY + __frameH - 1px)/100vw 1px no-repeat,

                            // CHECKER BACKGROUND
                            linear-gradient(45deg,
                                hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
                                hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
                                50% 50%/50px 50px,
                            linear-gradient(45deg,
                                hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
                                hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
                                calc(50% + 50px / 2) calc(50% + 50px / 2)/50px 50px,
                            radial-gradient(at 0% 0%, white, white)
                        `,
                        __settingsHeadingColor:      "__dark",
                        __settingsHeadingBackground: "__settingsColor",
                        __settingsBorderColor:       "__settingsColor",
                        __settingsBoxShadow:         "-1px 0 0 0 magenta",

                        // Shortcuts
                        __shortcutText: "__bright",
                        __shortcutBox:  "__dark",

                        // Article
                        __articlePadding:             "30px",
                        __articleBaseWidth:           "800px",
                        __articleBaseHeight:          "500px",
                        __articleBottomClip:          "__cBorderSize",
                        __articleLoadingSpinnerColor: "__bright",
                        __articleLoadingSpinnerChars: "¶ ",
                        __articleLoadingSpinnerDelay: 512,

                        // Caret
                        __articleCaretColor: "__bright",
                        __articleCaretScaleY: 0,

                        // Background
                        __cFrameWExtended: "calc(__frameW + (__cHalfHandleSize - __cHalfBorderSize) * 2)",
                        __articleFrameBackground: `
                            // HANDLES TOP
                            linear-gradient(90deg,
                                    transparent __cBorderSize,
                                    __dark __cBorderSize,
                                    __dark calc(__cBorderSize + __cSmallHandleSize),
                                    transparent calc(__cBorderSize + __cSmallHandleSize),
                                    transparent calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                                    __dark calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                                    __dark calc(__cFrameWExtended - __cBorderSize),
                                    transparent calc(__cFrameWExtended - __cBorderSize)
                                )
                                // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
                                // Y :: calc(__frameY + __cHalfBorderSize - __cHalfHandleSize + __cBorderSize)/
                                // W :: calc(__frameW - __cBorderSize + __cHandleSize)
                                // H :: __cSmallHandleSize

                                no-repeat,
                            linear-gradient(90deg,
                                __bright __cHandleSize,
                                transparent __cHandleSize,
                                transparent calc(__cFrameWExtended - __cHandleSize),
                                __bright calc(__cFrameWExtended - __cHandleSize)
                                )
                                // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
                                // Y :: calc(__frameY + __cHalfBorderSize - __cHalfHandleSize)/
                                // W :: calc(__frameW - __cBorderSize + __cHandleSize)
                                // H :: __cHandleSize
                                no-repeat,

                            // HANDLES BOTTOM
                            linear-gradient(90deg,
                                    transparent __cBorderSize,
                                    __dark __cBorderSize,
                                    __dark calc(__cBorderSize + __cSmallHandleSize),
                                    transparent calc(__cBorderSize + __cSmallHandleSize),
                                    transparent calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                                    __dark calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                                    __dark calc(__cFrameWExtended - __cBorderSize),
                                    transparent calc(__cFrameWExtended - __cBorderSize)
                                )
                                // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
                                // Y :: calc(__frameY + __frameH - __cHalfBorderSize - __cHalfHandleSize + __cBorderSize)/
                                // W :: calc(__frameW - __cBorderSize + __cHandleSize)
                                // H :: __cSmallHandleSize
                                no-repeat,
                            linear-gradient(90deg,
                                __bright __cHandleSize,
                                transparent __cHandleSize,
                                transparent calc(__cFrameWExtended - __cHandleSize),
                                __bright calc(__cFrameWExtended - __cHandleSize)
                                )
                                // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
                                // Y :: calc(__frameY + __frameH - __cHalfBorderSize - __cHalfHandleSize)/
                                // W :: calc(__frameW - __cBorderSize + __cHandleSize)
                                // H :: __cHandleSize
                                no-repeat,

                            // BORDER TOP
                            linear-gradient(__bright, __bright)
                                __frameX __frameY/__frameW __cBorderSize no-repeat,

                            // BORDER RIGHT
                            linear-gradient(__bright, __bright)
                                calc(__frameX + __frameW - __cBorderSize) __frameY/
                                __cBorderSize __frameH no-repeat,

                            // BORDER BOTTOM
                            linear-gradient(__bright, __bright)
                                __frameX calc(__frameY + __frameH - __cBorderSize)/
                                __frameW __cBorderSize no-repeat,

                            // BORDER LEFT
                            linear-gradient(__bright, __bright)
                                __frameX __frameY/__cBorderSize __frameH no-repeat
                            `,

                        // Thumbnail
                        __articleThumbnailBorder: "2px solid var(--bright)",

                        // Font
                        __articleExtractFont:                `calc(32px * __uFontSizeScaling)/
                                                              1.3em ObjectSans-Regular`,
                        __articleExtractFontFeatureSettings: "'salt'",

                        // Tokens
                        __tokenUpcomingColor:      "var(--bright)",
                        __tokenActiveColor:        "hsl(0, 0%, 80%)",
                        __tokenActiveBackground:   "transparent",
                        __tokenProgressColor:      "var(--bright)",
                        __tokenProgressBackground: `
                            linear-gradient(__bright, __bright) 0 92%/100% 2px no-repeat,
                            linear-gradient(__bright, __bright) 0 90%/1px 15% no-repeat,
                            linear-gradient(__bright, __bright) 100% 90%/1px 15% no-repeat
                        `,
                        __tokenTypedColor:         "hsl(0, 0%, 80%)",
                        __tokenTypedBackground:    "transparent",
                        __tokenErrorColor:         "hsl(360, 100%, 10%)",
                        __tokenErrorBackground:    "hsl(360, 100%, 60%)",
                        __tokenOffsetTop:          ".35ex",
                    },
                    term: {
                        name:   "Terminal",
                        id:     "term",
                        extend: "base",

                        // Custom
                        __cW: "200px",
                        __cH: "100px",
                        __cC: "hsl(83, 97%, 20%)",

                        // General
                        __dark:   "hsl(80, 55%, 8%)",
                        __bright: "hsl(83, 97%, 58%)",
                        __bodyBackground: `
                            linear-gradient(90deg,
                                __dark, __dark __asideWidth,
                                transparent __asideWidth),
                            radial-gradient(circle at center center,
                               __dark, transparent),
                            hsl(80, 35%, 8%)
                        `,

                        // Aside
                        __asideColor:                 "__bright",
                        __asideThumbnailMixBlendMode: "soft-light",
                        __asideThumbnailFilter:       "grayscale(1)",

                        // History
                        __historyBase:     "__bright",
                        __historyContrast: "__dark",

                        // Navigation
                        __upcomingOptionBackground: "__bright",
                        __upcomingOptionColor:      "__dark",

                        // Settings
                        __settingsColor:             "__bright",
                        __settingsBackground:        "__dark",
                        __settingsBorderColor:       "__bright",
                        __settingsHeadingColor:      "__dark",
                        __settingsHeadingBackground: "__bright",

                        // Shortcuts
                        __shortcutText: "__bright",
                        __shortcutBox:  "__dark",

                        // Article
                        __articleBaseWidth:           "900px",
                        __articleBaseHeight:          "500px",
                        __articleLoadingSpinnerColor: "__bright",
                        __articleLoadingSpinnerChars: "░ ▒ ",
                        __articleLoadingSpinnerDelay: 512,

                        // Caret
                        __articleCaretWidth: "0px",

                        // Background
                        __articleFrameBackground: `
                            linear-gradient(__dark, __dark)
                                0 0/__asideWidth 100vh
                                no-repeat,

                            linear-gradient(__cC, __cC)
                                __asideWidth 0/1px 100vh
                                no-repeat,

                            linear-gradient(__cC, __cC)
                                calc(100vw - __asideWidth - 1px) 0/1px 100vh
                                no-repeat,

                            linear-gradient(-26.5deg,
                                transparent, transparent calc(50% - 2px), __cC 50%,
                                transparent calc(50% + 2px), transparent
                            ) __kArticleFrameX __kArticleFrameY/
                                calc(__cW * 2) __cH,

                            linear-gradient(-26.5deg,
                                transparent, transparent calc(50% - 2px), __cC 50%,
                                transparent calc(50% + 2px), transparent
                            ) __kArticleFrameX __kArticleFrameY/__cW __cH,

                            linear-gradient(__cC 1px, transparent 1px)
                                __kArticleFrameX __kArticleFrameY/__cW __cH,

                            linear-gradient(90deg,
                                __cC 1px, transparent 1px)
                                __kArticleFrameX __kArticleFrameY/__cW __cH,

                            linear-gradient(__cC, __cC)
                                0 0/1px 100%
                                no-repeat,

                            linear-gradient(__cC, __cC)
                                100% 0/1px 100%
                                no-repeat
                        `,

                        // Thumbnail
                        __articleThumbnailBorder:       "1px solid __bright",
                        __articleThumbnailMixBlendMode: "color-dodge",
                        __articleThumbnailFilter:       "grayscale(0)",

                        // Font
                        __articleExtractFont: `calc(30px * __uFontSizeScaling)/
                                               1.5em "JetBrains Mono", monospace`,
                        __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                              "cv10", "cv11"`,

                        // Tokens
                        __tokenUpcomingBackground: "__bright",
                        __tokenActiveColor:        "hsla(83, 25%, 16.4%, 0.92)",
                        __tokenActiveBackground:   `linear-gradient(__bright, __bright)
                                                        0 100%/100% 50% no-repeat,
                                                    linear-gradient(__dark, __dark)
                                                        0 0/100% 100% no-repeat`,
                        __tokenProgressBackground: "__bright",
                        __tokenTypedColor:         "__tokenActiveColor",
                        __tokenTypedBackground:    `linear-gradient(__bright, __bright)
                                                        0 100%/100% 0% no-repeat,
                                                    linear-gradient(__dark, __dark)
                                                        0 0/100% 100% no-repeat`,
                        __tokenErrorColor:         "hsl(0, 100%, 9.43%)",
                        __tokenErrorBackground:    `linear-gradient(
                                                        hsl(0, 97%, 58%),
                                                        hsl(0, 97%, 58%) 50%,
                                                        hsl(15, 97%, 59%) 50%)`,
                    },
                },
            }
        };

        Object.entries(self.settings).forEach(([setting, data]) => {
            data.node = ƒ(`#${setting}`);
            data.node.dataset.type = data.type;

            init_options(setting, data.options, data.default_option);
            render_dom(data.node, data.options);
            add_listener(setting, data.node, data.type, data.options, data.default_option);

            º.respond({
                [`${setting} :getSelected`]: () => get_selected_options(data.options,
                                                                        data.type),
                [`${setting} :getRandom`]: () => rng(get_selected_options(data.options,
                                                                          data.type)),
                [`${setting} :getAll`]: () => data.options,
            });

            º.listen({
                [`setting :${setting}Updated`]: options => {
                    localStorage.setItem(setting, JSON.stringify(options));
                },
            });
        });

        update_status_bar();
    }();

    function init_options(setting, options, default_option) {
        const saved_options = JSON.parse(localStorage.getItem(setting));
        if (saved_options)
            default_option = saved_options;

        Object.entries(options).forEach(([key, state]) => {
            state.is_selected = Array.isArray(default_option)
                ? default_option.includes(key)
                : key === default_option;

        });
    }

    function render_dom(root, options) {
        const buffer = Array();

        Object.keys(options)
              .sort((a, b) => options[a].name.localeCompare(options[b].name))
              .forEach((key, i, arr) => {
            const state = options[key];
            const fragment = ª(ƒ("#settingsOptionTemplate"), "li");

            state.node = fragment;
            fragment.textContent = state.name;
            fragment.dataset.ref = key;
            fragment.dataset.isSelected = state.is_selected;

            buffer.push(fragment);
        });

        root.append(...buffer);
    }

    function get_selected_options(options, type) {
        const selected = Object.entries(options)
                               .filter(([key, state]) => state.is_selected)
                               .map(([key, state]) => key);

        return type === "radio" ? selected.shift() : selected;
    }

    function add_listener(setting, root, type, options, default_option) {
        root.addEventListener("click", (e) => {
            const target = e.target;
            const option = options?.[target.dataset.ref];
            if (!target.classList.contains("settingsOption"))
                return;

            // Make sure that only one option is selected at a time.
            if (type === "radio") {
                Object.values(options).forEach((state) => {
                    if (state.is_selected) {
                        state.is_selected = false;
                        state.node.dataset.isSelected = false;
                    }
                });
            }

            target.dataset.isSelected = (option.is_selected = !option.is_selected);

            // Make sure that at least one option is selected.
            if (type === "checkbox") {
                if (Object.values(options).every((state) => !state.is_selected)) {
                    const default_opt_node = options[default_option];
                    default_opt_node.is_selected = true;
                    default_opt_node.node.dataset.isSelected = true;
                }
            }

            update_status_bar();
            º.emit`setting :${setting}Updated`(get_selected_options(options, type));
        });
    }

    function update_status_bar() {
        const [lang, theme] = [self.settings.language, self.settings.theme];
        let status_txt = String();

        // Languages
        let selected = Object.entries(lang.options)
                             .filter(([key, state]) => state.is_selected)
                             .map(([key, state]) => key)
                             .sort();

        status_txt += selected.splice(0, lang.display_limit).join("\x20/\x20");

        if (selected.length)
            status_txt += ` + ${selected.length}`;

        // Theme
        status_txt += " & " +  º.req`theme :getSelected`();

        self.status_bar.textContent = status_txt;
    }
}();