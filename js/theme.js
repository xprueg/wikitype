void new class Theme extends Controller {
    __data() {
        this.$node = ƒ("html");
        this.active_theme = req`theme :getSelected`();
        this.themes = req`theme :getAll`();

        // Variables that can be controlled by the user.
        this.user = {
            __uFontSizeScaling: 1,
            __uArticleFontFamily: String(),
        };
    }

    __listen() {
        return {
            "setting :themeUpdated": theme => {
                this.reset_theme();
                this.set_theme_to(theme);
                this.set_font_to(req`font :getSelected`());

                emit`article :forceRender`();
            },
            "setting :fontUpdated": font_key => {
                this.set_font_to(font_key);
            },
            "theme :apply": this.apply.bind(this),
        };
    }

    __respond() {
        return {
            "theme :val": this.val.bind(this),
            "theme :valAsPx": this.val_as_px.bind(this),
            "theme :bool": this.bool.bind(this),
        };
    }

    __shortcuts() {
        return {
            "cmd +": () => this.update_user("__uFontSizeScaling", "increase"),
            "cmd -": () => this.update_user("__uFontSizeScaling", "decrease"),
            "cmd 0": () => this.update_user("__uFontSizeScaling", "reset"),
        };
    }

    __init() {
        this.set_theme_to(this.active_theme);
        this.set_font_to(req`font :getSelected`());
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

    /// Updates the user settings and applies the new values.
    ///
    /// [>] setting: str
    /// [<] change: *
    update_user(setting, change) {
        let val = this.user[setting];
        switch(setting) {
            case "__uFontSizeScaling":
                switch(change) {
                    case "increase": val += .05; break;
                    case "decrease": val -= .05; break;
                    case "reset": val = 1; break;
                }
                break;
            case "__uArticleFontFamily":
                val = change;
                break;
        }

        this.user[setting] = val;
        this.apply(this.user);
        emit`article :forceRender`();
    }

    set_font_to(font_key) {
        const current_theme = this.themes[this.active_theme];
        const theme_default = req`font :get`("theme_default");

        // Reset all settings
        this.apply(theme_default.variables);

        // If the key is 'theme_default' get the actual
        // font from the theme variables.
        if (font_key === "theme_default")
            font_key = req`theme :val`("__articleFontFamily");

        const font_obj =  req`font :get`(font_key);
        this.update_user("__uArticleFontFamily", font_obj.family);
        this.apply(font_obj.variables);

        // Inject font variables in theme.
        Object.assign(current_theme, theme_default.variables, font_obj.variables);
    }

    /// Transpiles a theme.
    ///
    /// [>] o: object{*: str}
    /// [<] object{*: str}
    transpile(o) {
        return Object.fromEntries(
            Object.entries(o).map(
                ([k, v]) => {
                    k = this.transpile_key(k);

                    v = String(v);
                    v = this.transpile_values(v);
                    v = this.transpile_comments(v);

                    return [k, v];
                }
            )
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

    /// Transforms every occurence of camel case strings to a CSS variable.
    /// `foo __cssVariable bar' turns into `foo var(--css-variable) bar'.
    ///
    /// [>] value: str
    /// [<] str
    transpile_values(value) {
        return value.replace(/__([A-Z]+)/gi, m => {
            return `var(${this.transpile_key(m)})`;
        });
    }

    /// Transforms comments from the passed in value. This allows to use C++-Style like
    /// comments in CSS values.
    /// "// comment" => "/* comment */"
    /// "// comment :: linear..." => "/* comment */ linear..."
    ///
    /// [>] value: str
    /// [<] str
    transpile_comments(value) {
        const comment = (m, g) => `/* ${g.trim()} */`;

        return value.replace(/^\s*\/\/([^\n:]*)::/gm, comment)
                    .replace(/^\s*\/\/(.*$)/gm, comment);
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

    /// Returns the property converted to a boolean.
    /// Only works for the strings "true" and "false" for now.
    ///
    /// [>] key: str
    /// [<] bool
    bool(key) {
        return this.val(key) === "true";
    }

    /// Returns the property converted to an absolute pixel value.
    ///
    /// [~] TODO: Support floats.
    ///
    /// [>] key: str
    /// [<] int
    val_as_px(key) {
        const [_, v, unit] = this.val(key).match(/(-?\d+)(.+)?/);

        switch(unit) {
            case "px":
                return +v;
            case "vw":
                return window.innerWidth / 100 * +v;
            case "vh":
                return window.innerHeight / 100 * +v;
            case undefined:
                return +v;
            default:
                throw Error(`Unkown unit '${unit}'.`);
        }
    }
}