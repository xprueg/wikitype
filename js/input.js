class InputData {
    constructor(string) {
        this.data = string;
        this.idx = 0;
    }

    static new (...args) {
        return new InputData(...args);
    }

    get char() {
        return this.data[this.idx];
    }

    set char(c) {
        const [before, after] = [this.data.substr(0, this.idx), this.data.substr(this.idx + 1)];
        this.data = before + c + after;
    }

    get len() {
        return this.data.length;
    }

    peek(chars = 1) {
        return this.data.substr(this.idx + 1, chars);
    }

    eat(chars = 1) {
        this.idx += chars;
    }
}

class InputState {
    constructor(token, input) {
        this.token = InputData.new(token);
        this.input = InputData.new(input);

        this.correct = String();
        this.upcoming = String();
        this.mistyped = String();
    }

    static new(...args) {
        return new InputState(...args);
    }

    compare() {
        for (;this.token.idx < this.token.len;) {
            if (!this.input.char) {
                this.upcoming = this.token.data.substr(this.token.idx);
                break;
            }

            if (this.token.char !== this.input.char) {
                const corrected = this.autocorrect();
                if (!(corrected ^ InputState.NOT_CORRECTED)) {
                    this.upcoming = this.token.data.substr(this.token.idx);
                    this.mistyped = this.input.data.substr(this.input.idx);
                    return false;
                } else if (!(corrected ^ InputState.RETRY)) {
                    continue;
                }
            }

            ++this.token.idx;
            ++this.input.idx;
        }

        this.correct = this.token.data.substr(0, this.token.idx);

        return this.correct === this.token.data;
    }

    autocorrect(state) {
        const token_c = this.token.char;
        const input_c = this.input.char;

        for (;;) {
            // Combining Acute Accent
            if ("\u0301" === token_c) {
                this.token.eat();
                return InputState.RETRY;
            }

            // Hyphens
            // U+2010 Hyphen
            // U+2011 Non-Breaking Hyphen
            // U+2012 Figure Dash
            // U+2013 En Dash
            // U+2014 Em Dash
            // U+2015 Horizontal Bar
            // U+2212 Minus Sign
            if (/[\u2010-\u2015\u2212]/.test(token_c) && /[-–—]/.test(input_c))
                break;

            // Single Quotation Marks
            // U+2018 Left Single Quotation Mark
            // U+2019 Right Single Quotation Mark
            // U+201A Single Low-9 Quotation Mark
            // U+201B Single High-Reversed-9 Quotation Mark
            // U+2032 Prime
            if (/[\u2018-\u201B\u2032]/.test(token_c) && /["'‘]/.test(input_c))
                break;

            // Double Quotation Marks
            // U+201C Left Double Quotation Mark
            // U+201D Right Double Quotation Mark
            // U+201E Double Low-9 Quotation Mar
            // U+201F Double High-Reversed-9 Quotation Mark
            // U+2033 Double Prime
            if (/[\u201C-\u201F\u2033]/.test(token_c) && /["']/.test(input_c))
                break;

            // Sharp S
            // U+00DF Latin Small Letter Sharp S
            // U+1E9E Latin Capital Letter Sharp S
            if (/[\u00DF\u1E9E]/.test(token_c) && /^(ss|ß)$/.test(input_c + this.input.peek())) {
                this.input.eat();
                break;
            }

            // Letter with Diaeresis
            // U+00F6 Latin Small Letter O with Diaeresis
            // U+00D6 Latin Capital Letter O with Diaeresis
            // U+00E4 Latin Small Letter A with Diaeresis
            // U+00C4 Latin Capital Letter A with Diaeresis
            // U+00FC Latin Small Letter U with Diaeresis
            // U+00DC Latin Capital Letter U with Diaeresis
            if (/[öäü]/i.test(token_c)) {
                const is_uppercase = /[ÖÄÜ]/.test(token_c);
                const peek = this.input.peek();

                if (/e/i.test(peek)) {
                    const chars = input_c + peek;
                    if (chars === (is_uppercase ? chars.toUpperCase() : chars.toLowerCase())) {
                        if (/ö/i.test(token_c) && /o/i.test(input_c) ||
                            /ä/i.test(token_c) && /a/i.test(input_c) ||
                            /ü/i.test(token_c) && /u/i.test(input_c)) {
                            this.input.eat();
                            break;
                        }
                    }
                }
            }

            // Math Symbol
            // U+00D7 Multiplication Sign
            if (/\u00D7/.test(token_c) && /[x]/i.test(input_c))
                break;

            // Whitespace & Zero Width Space
            // U+200B Zero Width Space (ZWSP)
            if (/\s|\u200B/.test(token_c) && /\s/.test(input_c))
                break;

            // Fractions
            // U+2044 Fraction Slash
            if (/[\u2044]/.test(token_c) && '/' === input_c)
                break;

            if (/\d+\u2044\d*/.test(token_c.normalize("NFKD"))) {
                const fraction = token_c.normalize("NFKD").replace("\u2044", "/");
                const user_input = input_c + this.input.peek(fraction.length - 1);

                if (fraction === user_input) {
                    this.input.eat(fraction.length - 1);
                    break;
                }
            }

            // Normalization
            // Superscripts and Subscripts
            if (token_c.normalize("NFKD") === input_c)
                if (token_c.normalize("NFKD").length === input_c.length)
                    break;

            return InputState.NOT_CORRECTED;
        }

        return InputState.CORRECTED;
    }
}

InputState.CORRECTED = 1 << 0;
InputState.NOT_CORRECTED = 1 << 1;
InputState.RETRY = 1 << 2;