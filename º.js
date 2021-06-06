/*

º.emit`namespace::message`();
º.req`namespace::message`();

º.listen({
    "namespace::message": () => void {}
});

º.respond({
    "namespace::message": () => {}
});

*/



const º = (function() {
    let listener = {};
    let responder = {};

    const get_type = x => Object.prototype.toString.call(x);
    const is_obj = obj => get_type(obj) === "[object Object]";
    const is_str = str => get_type(str) === "[object String]";
    const is_fn = fn => get_type(fn) === "[object Function]";
    const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

    function req(name) {
        console.assert(has_prop(responder, name));

        return (...args) => {
            listener[name]?.forEach((fn) => fn(...args));

            return responder[name](...args);
        };
    }

    function respond(r) {
        Object.entries(r).forEach(([name, fn]) => {
            console.assert(!has_prop(responder, name));
            console.assert(is_fn(fn), `${fn} is not a function.`);

            responder[name] = fn;
        });
    }

    function emit(name) {
        console.assert(has_prop(listener, name));

        return (...args) => {
            listener[name]?.forEach((fn) => fn(...args));
        };
    }

    function listen(l) {
        Object.entries(l).forEach(([name, fn]) => {
            console.assert(is_fn(fn), `${fn} is not a function.`);

            listener[name] ??= Array();
            listener[name].push(fn);
        });
    }

    return { req, respond, emit, listen };
})();