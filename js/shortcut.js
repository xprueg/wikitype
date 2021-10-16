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
        const key = /[+-]/.test(e.key)
            ? e.key
            : e.code.replace(/(Key|Digit)/, String()).toLowerCase();
        const cmd = e.metaKey ? "⌘" : String();

        return `${cmd}${key}`;
    }

    function key_event(e) {
        console.log(e.metaKey, e.key);
        const identifier = generate_identifier(e);
        const shortcut = self.shortcuts.get(identifier)?.[e.type];

        if (shortcut) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            shortcut(e);
        }
    }
}();