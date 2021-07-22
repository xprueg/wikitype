void function InputController() {
    const self = Object.create(null);

    void function init() {
        self.shortcuts = new Map();

        self.input = document.createElement("input");
        self.input.setAttribute("type", "text");
        self.input.setAttribute("autocomplete", "off");
        self.input.setAttribute("autocorrect", "off");
        self.input.setAttribute("spellcheck", "false");
        self.input.addEventListener("input", input_evt);

        self.current_key_is_dead = false;

        document.body.addEventListener("keydown", key_event);
        document.body.addEventListener("keyup", key_event);

        ƒ("body").appendChild(self.input);

        º.listen({
            'shortcut :set': (shortcut, keydown, keyup = () => {}) => {
                if (self.shortcuts.has(shortcut))
                    console.assert(`The shortcut [${shortcut}] has already been set.`);

                self.shortcuts.set(shortcut, { keydown, keyup });
            },
            'shortcut :setMultiple': (...shortcuts) => {
                shortcuts.forEach((shortcut) => º.emit`shortcut :set`(...shortcut));
            },
            'input :clear': () => clear_input(),
        });

        focus_input();
    }();

    function focus_input() {
        if (document.activeElement !== self.input) {
            self.input.focus();
        }
    }

    function clear_input() {
        self.input.value = String();
    }

    function key_event(e) {
        const key = e.key;
        const ctrl = e.ctrlKey || e.metaKey ? '^' : String();
        const shortcut = `${ctrl}${key}`;
        self.current_key_is_dead = (key === "Dead");

        focus_input();

        self.shortcuts.get(shortcut)?.[e.type](e);
    }

    function input_evt(kbevt) {
        const input_txt = self.input.value;
        const token_txt = º.req`article :getActiveTokenText`();

        // Don't updated on dead key as it will show up as mistyped text.
        if (self.current_key_is_dead)
            return;

        if (!token_txt) {
            º.emit`nav :select`(input_txt);
            clear_input();
            return;
        }

        let upcoming_txt = String();
        let mistyped_txt = String();

        if (token_txt.indexOf(input_txt) === 0) {
            if (token_txt.length === input_txt.length) {
                º.emit`article :advanceToken`();
                return void clear_input();
            }

            upcoming_txt = token_txt.substr(input_txt.length);
        } else {
            for (let i = 0; i < input_txt.length; ++i) {
                if (input_txt[i] !== token_txt[i]) {
                    upcoming_txt += token_txt.substr(i);
                    mistyped_txt = input_txt.substr(i);
                    break;
                }
            }
        }

        º.emit`article :updateProgressToken`(upcoming_txt, mistyped_txt);
    }
}();