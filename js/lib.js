function ƒ(selector, base = document) {
    return base.querySelector(selector);
}

function ƒƒ(selector, base = document) {
    return [...base.querySelectorAll(selector)];
}

function ø(node, type, fn) {
    if (Array.isArray(node))
        return void node.forEach((n) => ø(n, type, fn));

    node.addEventListener(type, fn);
}

/// Returns a new promise.
///
/// [>] fn :: Fn(*) -> *
/// [<] Promise
function µ(fn) {
    return new Promise(fn);
}

/// Returns a resolved promise.
///
/// [>] val :: *
/// [<] Promise
function µµ(val) {
    return Promise.resolve(val);
}

/// Fetches a url and returns a promise with the parsed response.
///
/// [>] url :: string
/// [<] Promise
function µƒ(url, fallback_value) {
    return fetch(url).then((res) => {
        if (!res.ok) {
            if (fallback_value) return fallback_value;
            else throw Error(`${res.status} Failed to load ${url}.`);
        }

        return res.json();
    });
}

/// Returns the selected node from a template.
///
/// [>] template :: node
/// [>] selector_to_extract :: string
/// [<] node
function ª(template, selector_to_extract) {
    return document.importNode(
        template.content.querySelector(selector_to_extract),
        true
    );
}