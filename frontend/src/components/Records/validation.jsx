const text = (str, fieldName = field, minLen = 0, maxLen = null) => {
    if (typeof str !== 'string') {
        throw new Error(`Invalid input type`);
    }
    if (minLen && str.length < minLen) {
        throw new Error(`${fieldName} must be at least ${minLen} characters long`);
    }
    if (maxLen && str.length > maxLen) {
        throw new Error(`${fieldName} must be at less then ${maxLen} characters long`);
    }
    return str;
}

export default {
  text,
}