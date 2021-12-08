void function ClockController() {
    const self = Object.create(null);

    void function init() {
        self.node = ƒ(".clock");

        // Display current time.
        render();

        // Update time every 60 seconds, starting at the next minute change.
        setTimeout(
            () => render() || setInterval(render, 1000 * 60),
            1000 * (60 - new Date().getSeconds())
        );
    }();

    function render() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");

        self.node.innerText = `${h}:${m}`;
    }
}();

void new class WPM extends Controller {
    __data() {
        this.$node = ƒ(".wpm");

        // Number of characters that count as a word.
        this.WORD = 5;

        this.most_recent_wpm = undefined;
        this.state = {
            seconds_passed: 0,
            keys_pressed: 0,
            time_start: 0,
        };

        this.last_render = 0;
        this.render_interval_ms = 1_000;

        this.bound_start_counting = this.start_counting.bind(this);
    }

    __listen() {
        return {
            "article :loaded": () => {
                document.body.addEventListener("keydown", this.bound_start_counting);
            },
            "article :completedToken": this.add_word.bind(this),
            "article :beforeUnload": current_article_data => {
                this.stop_counting(current_article_data.id);
            },
        };
    }

    __init() {
        this.render();
        setInterval(this.render.bind(this), this.render_interval_ms);
    }

    reset_initial_state() {
        Object.keys(this.state).forEach(key => {
            this.state[key] = 0;
        });
    }

    start_counting() {
        this.state.time_start = Date.now();

        document.body.removeEventListener("keydown", this.bound_start_counting);
    }

    stop_counting(pageid) {
        if (!this.state.time_start)
            return;

        const wpm = this.calculate_wpm();

        this.render();
        this.reset_initial_state();
        this.most_recent_wpm = wpm;

        º.emit`history :addWpmToPageId`(wpm, pageid);
    }

    add_word(token) {
        this.state.keys_pressed += [...token].length;
    }

    calculate_wpm() {
        let seconds_passed = this.state.seconds_passed;
        let keys_pressed = this.state.keys_pressed;

        if (this.state.time_start)
            seconds_passed += (Date.now() - this.state.time_start) / 1_000;

        if (seconds_passed === 0 || keys_pressed === 0)
            if (this.most_recent_wpm !== undefined)
                return this.most_recent_wpm;
            else
                return 0;

        if (seconds_passed < 60) {
            keys_pressed *= 60 / seconds_passed;
            seconds_passed = 60;
        }

        const words_typed = keys_pressed / this.WORD;
        return Math.round(60 / seconds_passed * words_typed);
    }

    render() {
        if (Date.now() - this.last_render > this.render_interval_ms) {
            this.$node.textContent = `${this.calculate_wpm()}WPM`;
            this.last_render = Date.now();
        }
    }
}