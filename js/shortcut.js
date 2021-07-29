void function ShortcutController() {
    const self = Object.create(null);

    void function init() {
        self.shortcuts = new Map();
        self.not_implemented = () => {};

        document.body.addEventListener("keydown", key_event, true);
        document.body.addEventListener("keyup", key_event, true);

        º.listen({
            'shortcut :set': (identifier, keydown, keyup) => {
                add_shortcut(identifier, keydown, keyup);
            },
            'shortcut :setMultiple': (...shortcuts) => {
                shortcuts.forEach((shortcut) => add_shortcut(...shortcut));
            },
        });
    }();

    function add_shortcut(identifier, keydown, keyup = self.not_implemented) {
        if (self.shortcuts.has(identifier))
            console.assert(`The shortcut [${identifier}] has already been set.`);

        self.shortcuts.set(identifier, { keydown, keyup });
    }

    function generate_identifier(e) {
        const key = e.key;
        const ctrl = e.ctrlKey || e.metaKey ? '^' : String();

        return `${ctrl}${key}`;
    }

    function key_event(e) {
        const identifier = generate_identifier(e);
        const shortcut = self.shortcuts.get(identifier)?.[e.type];

        if (shortcut) {
            e.preventDefault();
            e.stopPropagation();
            shortcut(e);
        }
    }
}();