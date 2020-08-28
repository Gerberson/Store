const Mask = {
    apply(input, func) {
        setTimeout(function() {
            input.value = Mask[func](value)
        }, 1)
    },
    formatBRL(value) {

    }
}