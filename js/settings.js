void new class Settings extends Controller {
    __data() {
        this.node = ƒ("#settings");
        this.status_bar = ƒ("#settingsStatus");
        this.settings = {
            language: LANGUAGE_SETTINGS,
            theme: THEME_SETTINGS,
        };
    }

    __init() {
        Object.entries(this.settings).forEach(([setting, data]) => {
            data.node = ƒ(`#${setting}`);
            data.node.dataset.type = data.type;

            this.init_options(setting, data.options, data.default_option);
            this.render_dom(data.node, data.options);
            this.add_listener(setting, data.node, data.type, data.options, data.default_option);

            º.respond({
                [`${setting} :getSelected`]: () => this.get_selected_options(data.options,
                                                                        data.type),
                [`${setting} :getRandom`]: () => rng(this.get_selected_options(data.options,
                                                                          data.type)),
                [`${setting} :getAll`]: () => data.options,
            });

            º.listen({
                [`setting :${setting}Updated`]: options => {
                    localStorage.setItem(setting, JSON.stringify(options));
                },
            });
        });

        this.update_status_bar();
    }

    init_options(setting, options, default_option) {
        if (!default_option)
            return;

        const saved_options = JSON.parse(localStorage.getItem(setting));
        if (saved_options)
            default_option = saved_options;

        Object.entries(options).forEach(([key, state]) => {
            state.is_selected = Array.isArray(default_option)
                ? default_option.includes(key)
                : key === default_option;

        });
    }

    render_dom(root, options) {
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

    get_selected_options(options, type) {
        const selected = Object.entries(options)
                               .filter(([key, state]) => state.is_selected)
                               .map(([key, state]) => key);

        return type === "radio" ? selected.shift() : selected;
    }

    add_listener(setting, root, type, options, default_option) {
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
            if (type === "checkbox" && default_option) {
                if (Object.values(options).every((state) => !state.is_selected)) {
                    const default_opt_node = options[default_option];
                    default_opt_node.is_selected = true;
                    default_opt_node.node.dataset.isSelected = true;
                }
            }

            this.update_status_bar();
            º.emit`setting :${setting}Updated`(this.get_selected_options(options, type));
        });
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

        this.status_bar.textContent = status_txt;
    }
}();