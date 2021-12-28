class Setting extends Controller {
    __listen() {
        return {
            [`setting :${this.setting}Updated`]: options => {
                localStorage.setItem(this.setting, JSON.stringify(options));
            },
        };
    }

    __respond() {
        return {
            [`${this.setting} :getSelected`]: () => this.get_selected_options(),
            [`${this.setting} :getRandom`]: () => rng(this.get_selected_options()),
            [`${this.setting} :getAll`]: () => this.options,
        };
    }

    __init() {
        this.$list = ƒ(`#${this.setting}`);
        this.$list.dataset.type = this.type;

        this.init_options();
        this.render();
        this.add_listener();
    }

    get_selected_options() {
        const selected = Object.entries(this.options)
                               .filter(([key, state]) => state.is_selected)
                               .map(([key, state]) => key);

        return this.type === "radio" ? selected.shift() : selected;
    }

    init_options() {
        let default_option = this.default_option;
        if (!default_option)
            return;

        const saved_options = JSON.parse(localStorage.getItem(this.setting));
        if (saved_options)
            default_option = saved_options;

        Object.entries(this.options).forEach(([key, state]) => {
            state.is_selected = Array.isArray(default_option)
                ? default_option.includes(key)
                : key === default_option;
        });
    }

    render() {
        const buffer = Array();

        Object.keys(this.options)
              .sort((a, b) => this.options[a].name.localeCompare(this.options[b].name))
              .forEach((key, i, arr) => {
            const state = this.options[key];
            const fragment = ª(ƒ("#settingsOptionTemplate"), "li");

            state.node = fragment;
            fragment.textContent = state.name;
            fragment.dataset.ref = key;
            fragment.dataset.isSelected = state.is_selected;

            buffer.push(fragment);
        });

        this.$list.append(...buffer);
    }

    add_listener() {
        this.$list.addEventListener("click", e => {
            const target = e.target;
            const option = this.options?.[target.dataset.ref];
            if (!target.classList.contains("settingsOption"))
                return;

            // Make sure that only one option is selected at a time.
            if (this.type === "radio") {
                Object.values(this.options).forEach(state => {
                    if (state.is_selected) {
                        state.is_selected = false;
                        state.node.dataset.isSelected = false;
                    }
                });
            }

            target.dataset.isSelected = (option.is_selected = !option.is_selected);

            // Make sure that at least one option is selected.
            if (this.type === "checkbox" && this.default_option) {
                if (Object.values(this.options).every(state => !state.is_selected)) {
                    const default_opt_node = this.options[this.default_option];
                    default_opt_node.is_selected = true;
                    default_opt_node.node.dataset.isSelected = true;
                }
            }

            º.emit`settings :updateStatusBar`();
            º.emit`setting :${this.setting}Updated`(this.get_selected_options());
        });
    }
}