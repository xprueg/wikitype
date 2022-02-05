const PRO_THEME = {
    name   : "Pro",
    id     : "pro",
    extend : "base",

    // General
    __dark   : "black",
    __bright : "white",

    // Setting
    __settingsHeadingColor : "__bright",
    __settingsBoxShadow    : "-1px 0 0 0 __dark",

    // Article
    __articleBaseWidth       : "900px",
    __articleBaseHeight      : "200px",
    __articleLimitTokenLines : 3,

    // Thumbnail
    __articleThumbnailFilter : "opacity(0)",

    // Font
    __articleFontFamily  : "pragmatic_pro",
    __articleExtractFont : "calc(32px * __uFontSizeScaling)/1.5em __uArticleFontFamily",

    // Tokens
    __tokenActiveColor     : "gainsboro",
    __tokenTypedColor      : "gainsboro",
    __tokenErrorColor      : "crimson",
    __tokenErrorBackground : "white",
};