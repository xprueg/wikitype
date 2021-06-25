void function SettingsController() {
    const self = Object.create(null);

    void function init() {
        self.settings = new Map();

        ƒƒ("[id$='Controller']").forEach((controller) => {
            const name = controller.getAttribute("id")
                                   .replace("Controller", String());
            const settings = controller.dataset.settings.split("\u0020");

           construct(name, {
               node: controller,
               multiple_selection: settings.includes("multiple"),
               default: ƒ("[data-defaultOption]", controller).dataset.option,
           });
        });
    }();

    function construct(name, data) {
        data.name = name;
        data.multiple_selection ??= false;
        data.state = ƒƒ("li", data.node).reduce(
            (state, li) => Object.assign(state, { [li.dataset.option]: false }),
            Object.create(null)
        );

        // Bind functions.
        data.toggle_option = toggle_option.bind(data);
        data.get_active_options = get_active_options.bind(data);
        data.update_options = update_options.bind(data);
        data.get_active_options = get_active_options.bind(data);

        // Select default option.
        data.update_options(ƒ(`[data-option=${data.default}`, data.node));

        // Listen for user interaction.
        data.node.addEventListener("click", (e) => {
            if (!(e.target instanceof HTMLLIElement))
                return;

            data.update_options(e.target);

            º.emit`setting::${name}Update`(
                data.multiple_selection
                    ? data.get_active_options()
                    : data.get_active_options().shift()
            );
        });

        º.respond({
            [`${name}::getDefault`]: () => data.default,
            [`${name}::getRandom`]: () => {
                const options = data.get_active_options();
                return options[Math.floor(Math.random() * options.length)];
            },
            [`${name}::getAll`]: () => Object.keys(data.state),
        });

        // Store reference.
        self.settings.set(name, data);
    }

    /// Returns a list containing the selected options.
    ///
    /// [<] Array<String*>
    function get_active_options() {
        return Object.keys(this.state).filter((option) => this.state[option]);
    }

    /// Toggles the provided node.
    ///
    /// [>] node :: HTMLLIElement
    /// [<] void
    function toggle_option(node) {
        const attr = node.dataset.option;

        this.state[attr] = !this.state[attr];
        node.classList.toggle("selected-option");
    }

    /// Updates the options and makes sure that all restrictions are upheld.
    ///
    /// [>] node_to_toggle :: HTMLLIElement
    /// [<] void
    function update_options(node_to_toggle) {
        // Update state.
        this.toggle_option(node_to_toggle);

        // Maybe prevent multiple selection.
        if (!this.multiple_selection && this.get_active_options().length) {
            ƒƒ("li", this.node).forEach((node) => {
                if (this.state[node.dataset.option] && node !== node_to_toggle)
                    this.toggle_option(node);
            });
        }

        // Make sure that at least one option is selected.
        if (this.get_active_options().length === 0)
            this.toggle_option(ƒ(`[data-option=${this.default}`, this.node));

        // Set active option interface.
        const active_options = this.get_active_options();
        if (active_options.length > 3)
            active_options.push(`+${active_options.splice(2).length}`);
        this.node.dataset.selectedOption = active_options.join(", ");
    }
}();