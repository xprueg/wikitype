void new class Shortcut extends Controller {
    __data() {
        this.shortcuts = new Map();
    }

    __listen() {
        return {
            "shortcut :set": this.add_shortcut.bind(this),
            "shortcut :setMultiple": (...shortcuts) => {
                shortcuts.forEach(shortcut => this.add_shortcut(...shortcut));
            },
        };
    }

    __init() {
        ["keydown", "keyup"].forEach(event => {
            document.body.addEventListener(event, this.key_event.bind(this), true);
        });
    }

    add_shortcut(identifier, keydown, keyup = undefined) {
        this.shortcuts.set(identifier, { keydown, keyup });
    }

    key_event(e) {
        const identifier = this.generate_identifier(e);
        const shortcut = this.shortcuts.get(identifier)?.[e.type];

        if (shortcut) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            shortcut(e);
        }
    }

    generate_identifier(e) {
        const cmd = e.metaKey ? "cmd" : String();
        const key = /[+-]/.test(e.key) ? e.key
                                       : e.code.replace(/(Key|Digit)/, String())
                                               .toLowerCase();

        return cmd ? `${cmd}\x20${key}` : key;
    }
}