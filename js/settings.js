void function SettingsController() {
    const self = Object.create(null);

    !function init() {
        self.node = ƒ("#settings");
        self.status_bar = ƒ("#settingsStatus");
        self.settings = {
            language: {
                type: "checkbox",
                default_option: "en",
                options: {
                    en: { name: "English" },
                    ru: { name: "Русский" },
                    de: { name: "Deutsch" },
                },
            },
            theme: {
                type: "radio",
                default_option: "neon",
                options: {
                    zen: { name: "Zensur" },
                    neon: { name: "Neon"  },
                    term: { name: "Terminal" },
                    pstr: { name: "Poster" },
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

        Object.keys(options).sort().forEach((key, i, arr) => {
            const state = options[key];
            const fragment = ª(ƒ("#settingsOptionTemplate"), "span");
            fragment.textContent = state.name;
            fragment.dataset.ref = key;
            fragment.dataset.isSelected = state.is_selected;
            buffer.push(fragment);

            if (i === arr.length - 2) {
                buffer.push(document.createTextNode(" or "));
            } else if (i < arr.length - 2)
                buffer.push(document.createTextNode(", "));

            state.node = fragment;
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
        let buffer = String();

        buffer += Object.entries(self.settings.language.options)
                        .filter(([key, state]) => state.is_selected)
                        .map(([key, state]) => key)
                        .sort()
                        .join(", ");

        buffer += " & ";

        Object.entries(self.settings.theme.options).forEach(([key, state]) => {
            if (state.is_selected) {
                buffer += key;
            }
        });

        self.status_bar.textContent = buffer;
    }
}();