/* Custom validators */
const isText = (str, fieldName = field, minLen = 0, maxLen = null) => {
    if (typeof str !== 'string') {
      isValid.valid = false  
      isValid.message = `Invalid input type`
    }
    if (minLen && str.length < minLen) {
      isValid.valid = false  
      isValid.message = `${fieldName} must be at least ${minLen} characters long`
    }
    if (maxLen && str.length > maxLen) {
      isValid.valid = false  
      isValid.message = `${fieldName} must be at less then ${maxLen} characters long`
    }
    return str
}

const isNumber = (num, fieldName = field, min = 0, max = null) => {
    const isValid = {
        valid: true,
        message: ''
    }
    if (typeof num !== 'number') {
        isValid.valid = false
        isValid.message = `Invalid input type`
    }
    if (min && num < min) {
        isValid.valid = false
        isValid.message = `${fieldName} must be at least ${min}`
    }
    if (max && num > max) {
        isValid.valid = false
        isValid.message = `${fieldName} must be at less then ${max}`
    }
    return num
}

export default {
  isText,
  isNumber
}