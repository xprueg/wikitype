const Messages = new class {
    constructor() {
        /// <T> responder: MAP{STR: FN(*) -> *}
        this.responder = new Map();
        /// <T> listener: MAP{STR: ARR[FN(*) -> VOID]}
        this.listener = new Map();
    }

    /// Joins both arrays from a tagged template.
    ///
    /// [>] template: ARR[STR]
    /// [>] substitutions: ARR[*]
    /// [<] STR
    join_tagged_template(template, substitutions) {
        return template.map((str, idx) => `${str}${substitutions[idx] ?? String()}`).join(String());
    }

    /// Tests if the passed in argument is a function.
    ///
    /// [>] maybe_fn: *
    /// [<] BOOL
    is_fn(maybe_fn) {
        return Object.prototype.toString.call(maybe_fn) === "[object Function]";
    }

    /// Adds responder messages.
    ///
    /// [>] responder: OBJ{STR: FN(*) -> *}
    /// [<] VOID
    respond(responder) {
        Object.entries(responder).filter(([message, fn]) => {
            if (this.responder.has(message)) {
                console.warn(`The message "${message}" has already been defined!`);
                return false;
            } else if (!this.is_fn(fn)) {
                console.warn(`${message} "${fn}" is not a function.`);
                return false;
            }

            return true;
        }).forEach(([message, fn]) => void this.responder.set(message, fn));
    }

    /// Returns a function, which returns a value, which can be called to emit
    /// a message.
    ///
    /// <?> req`ns :Message`(*)
    ///
    /// [>] message: STR
    /// [>] substitutions: ARR[*]
    /// [<] FN(*) -> *
    request(message, ...substitutions) {
        return this.responder.get(this.join_tagged_template(message, substitutions));
    }

    /// Adds listener messages.
    ///
    /// [>] listener: OBJ{STR: FN(*) -> VOID}
    /// [<] VOID
    listen(listener) {
        Object.entries(listener).filter(([message, fn]) => {
            if (!this.is_fn(fn)) {
                console.warn(`${message} "${fn}" is not a function.`);
                return false;
            }

            return true;
        }).forEach(([message, fn]) => {
            if (!this.listener.has(message))
                this.listener.set(message, Array());

            this.listener.get(message).push(fn);
        });
    }

    /// Returns a function which can be called to emit a message.
    ///
    /// <?> emit`ns :Message`(*)
    ///
    /// [>] message: STR
    /// [>] substitutions: ARR[*]
    /// [<] FN(*) -> VOID
    emit(message, ...substitutions) {
        const listener = this.listener.get(this.join_tagged_template(message, substitutions));

        return (...args) => void listener?.forEach(fn => fn(...args));
    }
}

const respond = Messages.respond.bind(Messages);
const req = Messages.request.bind(Messages);
const listen = Messages.listen.bind(Messages);
const emit = Messages.emit.bind(Messages);