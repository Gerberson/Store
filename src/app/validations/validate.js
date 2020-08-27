module.exports = {
    allProperties(body, message) {
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
    }
}