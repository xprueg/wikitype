class LanguageSetting extends Setting {
    __data() {
        this.setting = "language";
        this.type = "checkbox";
        this.display_limit = 3;
        this.default_option = "en";
        this.options = {
            en: { name: "English" },
            ru: { name: "Русский" },
            uk: { name: "Українська" },
            de: { name: "Deutsch" },
            nl: { name: "Nederlands" },
            lb: { name: "Lëtzebuergesch" },
            fr: { name: "Français" },
            cs: { name: "Čeština" },
            pl: { name: "Język polski" },
            it: { name: "Italiano" },
            da: { name: "Dansk" },
            sv: { name: "Svenska" },
            no: { name: "Norsk" },
            fi: { name: "Suomi" },
            es: { name: "Español" },
            sl: { name: "Slovenski jezik" },
            hr: { name: "Hrvatski jezik" },
            ro: { name: "Română" },
            lt: { name: "Lietuvių kalba" },
            be: { name: "Беларуская мова" },
            lv: { name: "Latviešu valoda" },
            lt: { name: "Lietuvių kalba" },
            tr: { name: "Türkçe" },
            ga: { name: "Gaeilge" },
            mk: { name: "Macedonian" },
            sw: { name: "Kiswahili" },
            cy: { name: "Welsh" },
            bg: { name: "Български език" },
        };
    }
}