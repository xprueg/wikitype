void function SettingsController() {
    const self = Object.create(null);

    !function init() {
        self.node = ƒ("#settings");
        self.status_bar = ƒ("#settingsStatus");
        self.settings = {
            language: {
                type: "checkbox",
                display_limit: 3,
                default_option: "en",
                options: {
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
                },
            },
            theme: {
                type: "radio",
                default_option: "zens",
                options: {
                    zens: { name: "Zensur" },
                    neon: { name: "Neon"  },
                    term: { name: "Terminal" },
                    note: { name: "Note" },
                },
            }
        };

        Object.entries(self.settings).forEach(([setting, data]) => {
            data.node = ƒ(`#${setting}`);
            data.node.dataset.type = data.type;

            init_options(data.options, data.default_option);
            render_dom(data.node, data.options);
            add_listener(setting, data.node, data.type, data.options, data.default_option);

            º.respond({
                [`${setting} :getSelected`]: () => get_selected_options(data.options,
                                                                        data.type),
                [`${setting} :getRandom`]: () => rng(get_selected_options(data.options,
                                                                          data.type)),
                [`${setting} :getAll`]: () => Object.keys(data.options),
            });
        });

        update_status_bar();
    }();

    function init_options(options, default_option) {
        Object.entries(options).forEach(([key, state]) => {
            state.is_selected = key === default_option;
        });
    }

    function render_dom(root, options) {
        const buffer = Array();

        Object.keys(options)
              .sort((a, b) => options[a].name.localeCompare(options[b].name))
              .forEach((key, i, arr) => {
            const state = options[key];
            const fragment = ª(ƒ("#settingsOptionTemplate"), "li");

            state.node = fragment;
            fragment.textContent = state.name;
            fragment.dataset.ref = key;
            fragment.dataset.isSelected = state.is_selected;

            buffer.push(fragment);
        });

        root.append(...buffer);
    }

    function get_selected_options(options, type) {
        const selected = Object.entries(options)
                               .filter(([key, state]) => state.is_selected)
                               .map(([key, state]) => key);

        return type === "radio" ? selected.shift() : selected;
    }

    function add_listener(setting, root, type, options, default_option) {
        root.addEventListener("click", (e) => {
            const target = e.target;
            const option = options?.[target.dataset.ref];
            if (!target.classList.contains("settingsOption"))
                return;

            // Make sure that only one option is selected at a time.
            if (type === "radio") {
                Object.values(options).forEach((state) => {
                    if (state.is_selected) {
                        state.is_selected = false;
                        state.node.dataset.isSelected = false;
                    }
                });
            }

            target.dataset.isSelected = (option.is_selected = !option.is_selected);

            // Make sure that at least one option is selected.
            if (type === "checkbox") {
                if (Object.values(options).every((state) => !state.is_selected)) {
                    const default_opt_node = options[default_option];
                    default_opt_node.is_selected = true;
                    default_opt_node.node.dataset.isSelected = true;
                }
            }

            update_status_bar();
            º.emit`setting :${setting}Updated`(get_selected_options(options, type));
        });
    }

    function update_status_bar() {
        const [lang, theme] = [self.settings.language, self.settings.theme];
        let status_txt = String();

        // Languages
        let selected = Object.entries(lang.options)
                             .filter(([key, state]) => state.is_selected)
                             .map(([key, state]) => key)
                             .sort();

        status_txt += selected.splice(0, lang.display_limit).join(" / ");

        if (selected.length)
            status_txt += ` + ${selected.length}`;

        // Spacer
        status_txt += "  &  ";

        // Theme
        status_txt += º.req`theme :getSelected`();

        // Update status bar
        self.status_bar.textContent = status_txt;
    }
}();