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
                        __globalBorderSize:  '0px',
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
                        __globalBorderSize:  '0px',
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
                        __globalBorderSize:  '0px',
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
                        __globalBorderSize:  '0px',
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

        status_txt += selected.splice(0, lang.display_limit).join(" / ");

        if (selected.length)
            status_txt += ` + ${selected.length}`;

        // Spacer
        status_txt += "  &  ";

        // Theme
        status_txt += º.req`theme :getSelected`();

        // Update status bar
        self.status_bar.textContent = status_txt;
    }
}();