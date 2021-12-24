const PRO_THEME = {
    name   : "Pro",
    id     : "pro",
    extend : "base",

    // General
    __dark   : "#1a1c2c",
    __bright : "#f4f4f4",

    // Settings
    __settingsBoxShadow : "0 0 1000px 100px __dark",

    // Article
    __articleBaseWidth           : "900px",
    __articleWidthShift          : "0px",
    __articleBaseHeight          : "200px",
    __articleHeightShift         : "0px",
    __articleRandomizePosition   : false,
    __articleLimitTokenLines     : 3,
    __articleLoadingSpinnerChars : "",
    __articleLoadingSpinnerDelay : 128,

    // Thumbnail
    __articleThumbnailFilter : "opacity(0)",

    // Font
    __articleExtractFont : "calc(32px * __uFontSizeScaling)/1.5em PragmataPro-Regular",

    // Tokens
    __tokenActiveColor     : "hsl(120, 7%, 85%)",
    __tokenTypedColor      : "hsl(120, 7%, 85%)",
    __tokenErrorColor      : "hsl(120, 10%, 90%)",
    __tokenErrorBackground : "hsl(120, 0%, 40%)",
};