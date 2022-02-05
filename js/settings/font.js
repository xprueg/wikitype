class FontSetting extends Setting {
    __data() {
        this.setting = "font";
        this.type = "radio";
        this.default_option = "theme_default";
        this.options = {
            // TODO Inlcude line-height.
            theme_default: {
                name: "Theme Default",
                variables: {
                    __articleExtractFontFeatureSettings: "normal",
                    __articleLoadingSpinnerChars:        "-\\|/",
                    __articleLoadingSpinnerDelay:        128,
                    __tokenOffsetTop:                    "0px",
                },
            },
            gt_america: {
                name: "GT America",
                family: "GTAmericaLC-ExpRg",
                variables: {
                    __articleExtractFontFeatureSettings: `"kern", "liga", "onum",
                                                          "ss02", "ss03", "ss05"`,
                    __articleLoadingSpinnerChars: "→↘↓↘",
                    __articleLoadingSpinnerDelay: 360,
                },
            },
            grafier: {
                name: "Grafier",
                family: "Grafier-Regular",
                variables: {
                    __articleExtractFontFeatureSettings: `"ss02"`,
                },
            },
            object_sans: {
                name: "Object Sans",
                family: "'ObjectSans-Regular'",
                variables: {
                    __articleLoadingSpinnerChars: "¶ ",
                    __articleLoadingSpinnerDelay: 512,
                    __articleExtractFontFeatureSettings: `"salt"`,
                    __tokenOffsetTop: ".3ex",
                },
            },
            jetbrains_mono: {
                name: "JetBrains Mono",
                family: "'JetBrains Mono'",
                variables: {
                    __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                          "cv10", "cv11"`,
                    __articleLoadingSpinnerChars: "░ ▒ ",
                    __articleLoadingSpinnerDelay: 512,
                },
            },
            pragmatic_pro: {
                name: "Pragmata Pro",
                family: "PragmataPro-Regular",
                variables: {
                    __articleLoadingSpinnerChars : "",
                    __articleLoadingSpinnerDelay : 128,
                },
            },
            system_ui: {
                name: "System UI",
                family: "system-ui",
                variables: {},
            },
        };
    }
}