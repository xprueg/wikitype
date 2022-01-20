const ZENS_THEME = {
    name:   "Zensur",
    id:     "zens",
    extend: "base",

    // General
    __dark:            "hsl(220, 9%, 9%)",
    __bright:          "white",
    __bodyBackground:  "__bright",

    // History
    __historyBase:     "hsl(0, 0%, 80%)",
    __historyContrast: "__bright",

    // Article
    __articleBaseWidth:           "100vw",
    __articleWidthShift:          "0px",
    __articleBaseHeight:          "100vh",
    __articleHeightShift:         "0px",
    __articleFadeTokenLines:      3,
    __articleLoadingSpinnerChars: "→↘↓↘",
    __articleLoadingSpinnerDelay: 360,

    // Caret
    __articleCaretWidth:  "2px",
    __articleCaretScaleY: 1.2,

    // Thumbnail
    __articleThumbnailBorder: "0px solid transparent",

    // Font
    __articleFontFamily:  "GTAmericaLC-ExpRg",
    __articleExtractFont: `400 clamp(20px, calc(1vw * 3 * __uFontSizeScaling), 60px)/
                           1.35em __uArticleFontFamily`,
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
};