void new class Theme extends Controller {
    __data() {
        this.$node = ƒ("html");
        this.active_theme = º.req`theme :getSelected`();
        this.themes = º.req`theme :getAll`();

        // Variables that can be controlled by the user.
        this.user = {
            __uFontSizeScaling: 1,
        };
    }

    __listen() {
        return {
            "setting :themeUpdated": theme => {
                º.emit`theme :beforeUpdate`();

                this.reset_theme();
                this.set_theme_to(theme);

                º.emit`theme :afterUpdate`();
            },
            "theme :apply": this.apply.bind(this),
        };
    }

    __respond() {
        return {
            "theme :val": this.val.bind(this),
            "theme :valAsPx": this.val_as_px.bind(this),
        };
    }

    __shortcuts() {
        return {
            "cmd +": () => (this.user.__uFontSizeScaling += .05, this.apply(this.user)),
            "cmd -": () => (this.user.__uFontSizeScaling -= .05, this.apply(this.user)),
            "cmd 0": () => (this.user.__uFontSizeScaling = 1, this.apply(this.user)),
        };
    }

    __init() {
        this.set_theme_to(this.active_theme);
        this.apply(this.user);

        ƒ("body").dataset.isTyping = "false";
        let is_typing_timeout;
        document.addEventListener("keydown", () => {
            clearTimeout(is_typing_timeout);

            ƒ("body").dataset.isTyping = "true";

            is_typing_timeout = setTimeout(() => {
                ƒ("body").dataset.isTyping = "false";
            }, 250);
        });
    }

    /// Transforms the keys from an object from camel case to CSS variable names.
    /// `__cssVariable' turns into `--css-variable'.
    ///
    /// [>] o: object{*: str}
    /// [<] object{*: str}
    transpile(o) {
        return Object.fromEntries(
            Object.entries(o).map(([k, v]) => [this.transpile_key(k), v])
        );
    }

    /// Transforms a string from camel case to a CSS variable name.
    /// `__cssVariable' turns into `--css-variable'.
    ///
    /// [>] key: str
    /// [<] str
    transpile_key(key) {
        return key.replace(/^__/, '--')
                  .replace(/([A-Z])/g, '-$1')
                  .toLowerCase();
    }

    /// Returns the extended theme object.
    ///
    /// [>] name: string
    /// [<] object{*: str}
    compile(name) {
        const theme = this.transpile(this.themes[name]);
        const parent = theme.extend;

        if (!parent)
            return theme;

        return Object.assign(Object.create(null), this.compile(parent), theme);
    }

    reset_theme() {
        Object.entries(this.compile(this.active_theme))
              .forEach(([key, value]) => this.$node.style.removeProperty(key));
    }

    /// Sets the active theme to the given name and applies it.
    ///
    /// [>] name: str
    /// [<] void
    set_theme_to(name) {
        this.apply(this.compile(this.active_theme = name));
    }

    /// Applies the given key value pairs to the html node.
    ///
    /// [>] vars: object{*: str}
    /// [<] void
    apply(vars) {
        Object.entries(this.transpile(vars))
              .forEach(([key, value]) => this.$node.style.setProperty(key, value));
   }

    /// Returns the raw property value as a string.
    ///
    /// [>] key: str
    /// [<] str
    val(key) {
        return this.compile(this.active_theme)[this.transpile_key(key)];
    }

    /// Returns the property converted to an absolute pixel value.
    ///
    /// [~] TODO: Support floats.
    ///
    /// [>] key: str
    /// [<] int
    val_as_px(key) {
        const [_, v, unit] = this.val(key).match(/(\d+)(.+)/);

        switch(unit) {
            case "px":
                return +v;
            case "vw":
                return window.innerWidth / 100 * +v;
            case "vh":
                return window.innerHeight / 100 * +v;
            default:
                throw Error(`Unkown unit '${unit}'.`);
        }
    }
}