class FontSetting extends Setting {
    __data() {
        this.setting = "font";
        this.type = "radio";
        this.default_option = "theme_default";
        this.options = {
            // TODO Store __articleExtractFontFeatureSettings in here as well.
            // TODO Store __articleLoadingSpinnerChars in here as well.
            theme_default: {
                name: "Theme Default",
                family: "var(--article-font-family)",
            },
            gt_america: {
                name: "GT America",
                family: "GTAmericaLC-ExpRg",
            },
            grafier: {
                name: "Grafier",
                family: "Grafier-Regular",
            },
            object_sans: {
                name: "Object Sans",
                family: "'ObjectSans-Regular'",
            },
            jetbrains_mono: {
                name: "JetBrains Mono",
                family: "'JetBrains Mono'",
            },
            pragmatic_pro: {
                name: "Pragmata Pro",
                family: "PragmataPro-Regular",
            },
        };
    }
}