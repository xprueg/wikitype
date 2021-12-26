class ThemeSetting extends Setting {
    __data() {
        this.setting = "theme";
        this.type = "radio";
        this.default_option = "zens";
        this.options = {
            base: BASE_THEME,
            zens: ZENS_THEME,
            note: NOTE_THEME,
            alph: ALPH_THEME,
            term: TERM_THEME,
             pro: PRO_THEME,
        };
    }
}