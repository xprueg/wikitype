const BASE_THEME = {
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
    __articleBaseWidth:           "900px",
    __articleWidthShift:          "0px",
    __articleBaseHeight:          "0px",
    __articleHeightShift:         "0px",
    __articleRandomizePosition:   false,
    __articleBottomClip:          "0",
    __articleLimitTokenLines:     3,
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
    __articleFontFamily:                 "system-ui",
    __articleExtractFont:                `400 calc(30px * __uFontSizeScaling)/
                                          1.4em __uArticleFontFamily`,
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
};