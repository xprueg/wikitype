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