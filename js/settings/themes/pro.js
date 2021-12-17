const PRO_THEME = {
    name: "Pro",
    id:   "pro",
    extend: "base",

    // General
    __dark:   "hsl(180, 1.45%, 13.53%)",
    __bright: "hsl(120, 25%, 95.29%)",

    // Settings
    __settingsBoxShadow: "0 0 1000px 100px __dark",

    // Article
    __articleBaseWidth:           "750px",
    __articleWidthShift:          "0px",
    __articleBaseHeight:          "200px",
    __articleHeightShift:         "0px",
    __articleRandomizePosition:   false,
    __articleBottomClip:          "-100vh",
    __articleFadeTokenLines:      3,
    __articleLoadingSpinnerChars: "",
    __articleLoadingSpinnerDelay: 128,

    // Font
    __articleExtractFont: `calc(30px * __uFontSizeScaling)/1.4em PragmataPro-Regular`,

    // Tokens
    __tokenActiveColor:     "hsl(120, 7%, 85%)",
    __tokenTypedColor:      "hsl(120, 7%, 85%)",
    __tokenErrorColor:      "hsl(120, 10%, 90%)",
    __tokenErrorBackground: "hsl(120, 0%, 40%)",
};