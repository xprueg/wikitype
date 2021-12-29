void new class Spinner extends Controller {
    __data() {
        this.spinner = new Map();
        this.spinner_element_id = "loadingSpinner";
    }

    __listen() {
        return {
            "spinner :spawn": this.spawn.bind(this),
            "spinner :kill": this.kill.bind(this),
        };
    }

    /// Creates a spinner within the specified element.
    ///
    /// [>] $node: HTMLElement
    /// [<] void
    spawn($node) {
        // Prevent multiple spinner on a single node.
        if (this.spinner.has($node))
            return;

        this.spinner.set($node, {
            $spinner: $node.appendChild(Object.assign(
                document.createElement("div"), { id: this.spinner_element_id }
            )),
            frame: 0,
            chars: req`theme :val`("__articleLoadingSpinnerChars"),
            id: setInterval(
                () => this.update($node),
                req`theme :val`("__articleLoadingSpinnerDelay")
            ),
        });

        this.update($node);
    }

    /// Removes the spinner from the specified element.
    ///
    /// [>] $node: HTMLElement
    /// [<] void
    kill($node) {
        if (!this.spinner.has($node))
            return;

        const { $spinner, id } = this.spinner.get($node);

        $spinner.remove();
        clearInterval(id);

        this.spinner.delete($node);
    }

    /// Updates the spinner within the specified element.
    ///
    /// [>] $node: HTMLElement
    /// [<] void
    update($node) {
        const data = this.spinner.get($node);
        const { $spinner, chars, frame } = data;

        let next_frame = frame + 1;
        if (next_frame > chars.length - 1)
            next_frame = 0;

        $spinner.innerText = chars[next_frame];
        data.frame = next_frame;
    }
}