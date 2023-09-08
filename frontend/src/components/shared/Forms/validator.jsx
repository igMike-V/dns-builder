/* Custom validators */
const isText = (str, fieldName = 'field', minLen = 0, maxLen = null) => {
  const isValid = {
    valid: true,
    message: ''
  }
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
  return isValid
}

const isNumber = (num, fieldName = 'field', min = 0, max = null) => {
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
  return isValid
}

const isDomain = (domain, fieldName = field) => {
  const isValid = {
    valid: true,
    message: ''
  }
  if (
    domain.match(
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    )
  ) {
    return isValid
  } else {
    isValid.valid = false
    isValid.message = `${fieldName} is not a valid domain`
    return isValid
  }
}

const isIp = (ip, fieldName = field) => {
  const isValid = {
    valid: true,
    message: ''
  }
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  if (ip.match(ipPattern)) {
    return isValid
  } else {
    isValid.valid = false
    isValid.message = `${fieldName} is not a valid IP address`
    return isValid
  }
}

const setInvalid = (setInputs, field, message) => {
  // setInputs is a passed state setter function
  setInputs((prevInputs) => {
    return {
      ...prevInputs,
      [field]: {
        ...prevInputs[field],
        error: true,
        errorMessage: message
      }
    }
  })
}

export default {
  isText,
  isNumber,
  isDomain,
  setInvalid,
  isIp
}
