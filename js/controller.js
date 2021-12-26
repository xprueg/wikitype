class Controller {
    constructor() {
        this.exec("__data");
        this.exec("__listen");
        this.exec("__respond");

        const shortcuts = this.exec("__shortcuts", {});
        for (const [message, fn] of Object.entries(shortcuts)) {
            if (fn instanceof Function)
                º.emit`shortcut :set`(message, fn);
            else
                º.emit`shortcut :set`(message, fn?.keydown, fn?.keyup);
        }

        this.exec("__init");
    }

    static new(...args) {
        return new this(...args);
    }

    exec(fn_name, fallback) {
        if (this[fn_name]) {
            switch(fn_name) {
                case "__listen":
                    º.listen(this.__listen());
                    break;

                case "__respond":
                    º.respond(this.__respond());
                    break;

                default:
                    return this[fn_name]();
                    break;
            }
        } else if (fallback)
            return fallback;
    }
}