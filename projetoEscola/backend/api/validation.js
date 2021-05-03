module.exports = app => {
    existsOrError = (value, msg) => {
        if(!value) throw msg
        if(Array.isArray(value) && value.length == 0) throw msg
        if(typeof value == 'string' && !value.trim()) throw msg
    }

    notExistsOrError = (value, msg) => {
        try {
            existsOrError(value)
        } catch {
            return
        }
        throw msg
    }
    const equalsOrError = (valueA, valueB, msg) => {
        if(valueA != valueB) throw msg
    }
    return { existsOrError, notExistsOrError, equalsOrError}
}