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
        const selected_languages = req`language :getSelected`().sort();
        const displayed_languages = selected_languages.splice(0, this.settings.language.display_limit);

        this.$status_bar.textContent = String();
        this.$status_bar.textContent += displayed_languages.join(" / ");

        if (selected_languages.length)
            this.$status_bar.textContent += ` + ${selected_languages.length}`;

        this.$status_bar.textContent += " & ";
        this.$status_bar.textContent += req`theme :getSelected`();
    }
}();