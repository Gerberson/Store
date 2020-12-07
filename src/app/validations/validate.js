module.exports = {
    AllProperties(body, message) {
        let isValid = false

        const keys = Object.keys(body)

        for(key of keys) {
            if (body[key] == '') {
                isValid = true
            }

        }

        return {
            isValid,
            message
        }
    },
    MinLength(value, min, message) {
        return {
            isValid: value < min,
            message
        }
    },
    MaxLength(value, min, message) {
        return {
            isValid: value > min,
            message
        }
    },
    AreEquals(value, min, message) {
        return {
            isValid: value > min,
            message
        }
    }
}