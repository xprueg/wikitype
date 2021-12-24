const PRO_THEME = {
    name   : "Pro",
    id     : "pro",
    extend : "base",

    // Custom
    __cSize              : "2px",
    __cBgSize            : "calc(__cSize * 2)",
    __cColor             : "__dark",
    __cHalfBgSize        : "calc(__cBgSize / 2)",
    __cHeight            : "calc(__mainPadding * .5)",
    __cCheckerBackground : `
        // Overlay
        linear-gradient(__bright, __bright) 0 0/100% calc(100% - __cHeight) no-repeat,

        // Checker Pattern
        linear-gradient(45deg, __cColor, __cColor 25%, transparent 25%)
                        0 0/__cBgSize __cBgSize,
        linear-gradient(-45deg, __cColor, __cColor 25%, transparent 25%)
                        0 calc(-1 * __cHalfBgSize)/__cBgSize __cBgSize,
        linear-gradient(45deg, transparent, transparent 75%, __cColor 75%)
                        calc(-1 * __cHalfBgSize) __cHalfBgSize/__cBgSize __cBgSize,
        linear-gradient(-45deg, transparent, transparent 75%, __cColor 75%)
                        __cHalfBgSize 0/__cBgSize __cBgSize,

        // Background
        linear-gradient(__bright, __bright)
    `,

    // General
    __dark           : "hsl(.90, 90%, .43%)",
    __bright         : "hsl(43.90, 43%, 90%)",
    __bodyBackground : "__cCheckerBackground",

    // Settings
    __settingsBackground   : "__cCheckerBackground",
    __settingsHeadingColor : "__bright",
    __settingsBoxShadow    : "0 0 1000px 100px __dark",

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