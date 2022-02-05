const ALPH_THEME = {
    name:   "Alpha",
    id:     "alph",
    extend: "base",

    // Custom
    __cBorderSize:      "2px",
    __cHalfBorderSize:  "calc(__cBorderSize / 2)",
    __cHandleSize:      "8px",
    __cHalfHandleSize:  "calc(__cHandleSize / 2)",
    __cSmallHandleSize: "calc(__cHandleSize - __cBorderSize * 2)",

    __frameX: "__kArticleFrameX",
    __frameY: "__kArticleFrameY",
    __frameW: "__kArticleFrameW",
    __frameH: "__kArticleFrameH",

    // General
    __dark:   "white",
    __bright: "black",
    __bodyBackground: `
        // LEFT STATIC GUIDE
        linear-gradient(magenta, magenta)
            __asideWidth 0/1px 100vh no-repeat,
        // RIGHT STATIC GUIDE
        linear-gradient(magenta, magenta)
            calc(100vw - __asideWidth - 1px) 0/1px 100vh no-repeat,

        // TOP ARTICLE GUIDE
        linear-gradient(cyan, cyan)
            0 __frameY/100vw 1px no-repeat,
        // LEFT ARTICLE GUIDE
        linear-gradient(cyan, cyan)
            __frameX 0/1px 100vh no-repeat,
        // BOTTOM ARTICLE GUIDE
        linear-gradient(cyan, cyan)
            0 calc(__frameY + __frameH - 1px)/100vw 1px no-repeat,
        // RIGHT ARTICLE GUIDE
        linear-gradient(cyan, cyan)
            calc(__frameX + __frameW - 1px) 0/1px 100vh no-repeat,

        // CHECKER BACKGROUND
        linear-gradient(45deg,
            hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
            hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
            50% 50%/50px 50px,
        linear-gradient(45deg,
            hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
            hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
            calc(50% + 50px / 2) calc(50% + 50px / 2)/50px 50px,
        radial-gradient(at 0% 0%, white, white)
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
    __settingsColor: "__bright",
    __settingsBackground: `
        // TOP ARTICLE GUIDE
        linear-gradient(cyan, cyan)
            0 __frameY/100vw 1px no-repeat,
        // BOTTOM ARTICLE GUIDE
        linear-gradient(cyan, cyan)
            0 calc(__frameY + __frameH - 1px)/100vw 1px no-repeat,

        // CHECKER BACKGROUND
        linear-gradient(45deg,
            hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
            hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
            50% 50%/50px 50px,
        linear-gradient(45deg,
            hsla(0, 0%, 0%, .04) 25%, transparent 25%, transparent 75%,
            hsla(0, 0%, 0%, .04) 75%, hsla(0, 0%, 0%, .04))
            calc(50% + 50px / 2) calc(50% + 50px / 2)/50px 50px,
        radial-gradient(at 0% 0%, white, white)
    `,
    __settingsHeadingColor:      "__dark",
    __settingsHeadingBackground: "__settingsColor",
    __settingsBorderColor:       "__settingsColor",
    __settingsBoxShadow:         "-1px 0 0 0 magenta",

    // Shortcuts
    __shortcutText: "__bright",
    __shortcutBox:  "__dark",

    // Article
    __articlePadding:             "30px",
    __articleBaseWidth:           "900px",
    __articleLimitTokenLines:     6,
    __articleBottomClip:          "__articlePadding",
    __articleLoadingSpinnerColor: "__bright",

    // Caret
    __articleCaretColor: "__bright",
    __articleCaretScaleY: 0,

    // Background
    __cFrameWExtended: "calc(__frameW + (__cHalfHandleSize - __cHalfBorderSize) * 2)",
    __articleFrameBackground: `
        // HANDLES TOP
        linear-gradient(90deg,
                transparent __cBorderSize,
                __dark __cBorderSize,
                __dark calc(__cBorderSize + __cSmallHandleSize),
                transparent calc(__cBorderSize + __cSmallHandleSize),
                transparent calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                __dark calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                __dark calc(__cFrameWExtended - __cBorderSize),
                transparent calc(__cFrameWExtended - __cBorderSize)
            )
            // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
            // Y :: calc(__frameY + __cHalfBorderSize - __cHalfHandleSize + __cBorderSize)/
            // W :: calc(__frameW - __cBorderSize + __cHandleSize)
            // H :: __cSmallHandleSize

            no-repeat,
        linear-gradient(90deg,
            __bright __cHandleSize,
            transparent __cHandleSize,
            transparent calc(__cFrameWExtended - __cHandleSize),
            __bright calc(__cFrameWExtended - __cHandleSize)
            )
            // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
            // Y :: calc(__frameY + __cHalfBorderSize - __cHalfHandleSize)/
            // W :: calc(__frameW - __cBorderSize + __cHandleSize)
            // H :: __cHandleSize
            no-repeat,

        // HANDLES BOTTOM
        linear-gradient(90deg,
                transparent __cBorderSize,
                __dark __cBorderSize,
                __dark calc(__cBorderSize + __cSmallHandleSize),
                transparent calc(__cBorderSize + __cSmallHandleSize),
                transparent calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                __dark calc(__cFrameWExtended - __cSmallHandleSize - __cBorderSize),
                __dark calc(__cFrameWExtended - __cBorderSize),
                transparent calc(__cFrameWExtended - __cBorderSize)
            )
            // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
            // Y :: calc(__frameY + __frameH - __cHalfBorderSize - __cHalfHandleSize + __cBorderSize)/
            // W :: calc(__frameW - __cBorderSize + __cHandleSize)
            // H :: __cSmallHandleSize
            no-repeat,
        linear-gradient(90deg,
            __bright __cHandleSize,
            transparent __cHandleSize,
            transparent calc(__cFrameWExtended - __cHandleSize),
            __bright calc(__cFrameWExtended - __cHandleSize)
            )
            // X :: calc(__frameX + __cHalfBorderSize - __cHalfHandleSize)
            // Y :: calc(__frameY + __frameH - __cHalfBorderSize - __cHalfHandleSize)/
            // W :: calc(__frameW - __cBorderSize + __cHandleSize)
            // H :: __cHandleSize
            no-repeat,

        // BORDER TOP
        linear-gradient(__bright, __bright)
            __frameX __frameY/__frameW __cBorderSize no-repeat,

        // BORDER RIGHT
        linear-gradient(__bright, __bright)
            calc(__frameX + __frameW - __cBorderSize) __frameY/
            __cBorderSize __frameH no-repeat,

        // BORDER BOTTOM
        linear-gradient(__bright, __bright)
            __frameX calc(__frameY + __frameH - __cBorderSize)/
            __frameW __cBorderSize no-repeat,

        // BORDER LEFT
        linear-gradient(__bright, __bright)
            __frameX __frameY/__cBorderSize __frameH no-repeat
        `,

    // Thumbnail
    __articleThumbnailBorder: "2px solid var(--bright)",

    // Font
    __articleFontFamily:                 "object_sans",
    __articleExtractFont:                `calc(32px * __uFontSizeScaling)/
                                          1.3em __uArticleFontFamily`,

    // Tokens
    __tokenUpcomingColor:      "var(--bright)",
    __tokenActiveColor:        "hsl(0, 0%, 80%)",
    __tokenActiveBackground:   "transparent",
    __tokenProgressColor:      "var(--bright)",
    __tokenProgressBackground: `
        linear-gradient(__bright, __bright) 0 92%/100% 2px no-repeat,
        linear-gradient(__bright, __bright) 0 90%/1px 15% no-repeat,
        linear-gradient(__bright, __bright) 100% 90%/1px 15% no-repeat
    `,
    __tokenTypedColor:         "hsl(0, 0%, 80%)",
    __tokenTypedBackground:    "transparent",
    __tokenErrorColor:         "hsl(360, 100%, 10%)",
    __tokenErrorBackground:    "hsl(360, 100%, 60%)",
};