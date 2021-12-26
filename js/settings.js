void new class Settings extends Controller {
    __data() {
        this.$status_bar = ƒ("#settingsStatus");
        this.settings = {
            language: LanguageSetting.new(),
            theme: ThemeSetting.new(),
        };
    }

    __listen() {
        return {
            "settings :updateStatusBar": this.update_status_bar.bind(this),
        };
    }

    __init() {
        this.update_status_bar();
    }

    update_status_bar() {
        const [lang, theme] = [this.settings.language, this.settings.theme];
        let status_txt = String();

        // Languages
        let selected = Object.entries(lang.options)
                             .filter(([key, state]) => state.is_selected)
                             .map(([key, state]) => key)
                             .sort();

        status_txt += selected.splice(0, lang.display_limit).join("\x20/\x20");

        if (selected.length)
            status_txt += ` + ${selected.length}`;

        // Theme
        status_txt += " & " +  º.req`theme :getSelected`();

        this.$status_bar.textContent = status_txt;
    }
}();