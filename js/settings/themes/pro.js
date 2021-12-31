const PRO_THEME = {
    name   : "Pro",
    id     : "pro",
    extend : "base",

    // General
    __dark           : "black",
    __bright         : "white",

    // Setting
    __settingsHeadingColor : "__bright",
    __settingsBoxShadow    : "-1px 0 0 0 __dark",

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
    __tokenActiveColor     : "gainsboro",
    __tokenTypedColor      : "gainsboro",
    __tokenErrorColor      : "crimson",
    __tokenErrorBackground : "white",
};