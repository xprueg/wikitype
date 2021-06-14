void function InputController() {
    const self = Object.create(null);

    void function init() {
        self.input = document.createElement("input");
        self.input.setAttribute("type", "text");
        self.input.setAttribute("autocomplete", "off");
        self.input.setAttribute("autocorrect", "off");
        self.input.setAttribute("spellcheck", "false");
        self.input.addEventListener("input", input_evt);

        self.current_key_is_dead = false;

        document.body.addEventListener("keydown", keydown_evt);

        ƒ("body").appendChild(self.input);

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

    function keydown_evt(e) {
        self.current_key_is_dead = (e.key === "Dead");

        focus_input();
        handle_shortcut(e);
    }

    function handle_shortcut(e) {
        const key = e.key;
        const ctrl = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;

        switch(key) {
            case "Tab":
                break;
            case "Enter": {
                const url = º.req`article::getUrl`();
                if (url)
                    window.open(url);
            } break;
        }

        if (ctrl) {
            switch(key) {
                case "s":
                    º.emit`article::advance_token`();
                    clear_input();
                    break;
                case "n":
                    º.emit`article::unloadArticle`();
                    break;
            }
        }
    }

    function input_evt(kbevt) {
        const input_txt = self.input.value;
        const token_txt = º.req`article::get_active_token_text`();

        // Don't updated on dead key as it will show up as mistyped text.
        if (self.current_key_is_dead)
            return;

        if (!token_txt) {
            º.emit`nav::select`(input_txt);
            clear_input();
            return;
        }

        let upcoming_txt = String();
        let mistyped_txt = String();

        if (token_txt.indexOf(input_txt) === 0) {
            if (token_txt.length === input_txt.length) {
                º.emit`article::advance_token`();
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

        º.emit`article::set_token_upcoming_text`(upcoming_txt);
        º.emit`article::set_token_mistyped_text`(mistyped_txt);
    }
}();