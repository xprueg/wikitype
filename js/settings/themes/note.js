const NOTE_THEME = {
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

    // Article
    __articleBaseWidth:           "800px",
    __articleLimitTokenLines:     5,

    __articlePadding:             "50px",
    __articleBottomClip:          "__articlePadding",
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
    __articleFontFamily:  "Grafier-Regular",
    __articleExtractFont: `calc(34px * __uFontSizeScaling)/
                           1.4em __uArticleFontFamily`,
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
};