const TERM_THEME = {
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
};