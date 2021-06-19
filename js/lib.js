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

/// Preloads an image and calls next upon completion.
///
/// [>] source: String
/// [>] next: Fn(img: HTMLImageElement) -> Void
/// [<] Void
function π(source, next) {
    const img = new Image();
    img.onload = () => next(img);
    img.src = source;
}

/// Returns a new promise.
///
/// [>] fn: Fn(*) -> *
/// [<] Promise
function µ(fn) {
    return new Promise(fn);
}

/// Returns a resolved promise.
///
/// [>] val: *
/// [<] Promise
function µµ(val) {
    return Promise.resolve(val);
}

/// Fetches a url and returns a promise with the parsed response.
///
/// [>] url: String
/// [<] Promise
function µƒ(url, fallback_value) {
    return fetch(url).then((res) => {
        if (!res.ok) {
            if (fallback_value) return fallback_value;
            else throw Error(`${res.status} Failed to load ${url}.`);
        }

        return res.json();
    }).catch((err) => {
        alert("No Internet");
        throw Error("No Internet");
    });
}

/// Returns the selected node from a template.
///
/// [>] template: HTMLTemplateElement
/// [>] selector_to_extract: String
/// [<] HTMLElement
function ª(template, selector_to_extract) {
    return document.importNode(
        template.content.querySelector(selector_to_extract),
        true
    );
}