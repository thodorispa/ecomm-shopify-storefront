import Validator from 'validator'

const sharedUserUtils = (store, dispatch) => {
  return {
    invalidUsername: str => {
      let error = false;
      const illegalChars = /\W/; // allow letters, numbers, and underscores

      if (!str || str == "") {
        error = "Username is required";
      } else if ((str.length < 5) || (str.length > 15)) {
        error = "Username must have 5-15 characters";
      } else if (illegalChars.test(str)) {
        error = "Username can only contain numbers and alphabets";
      }

      return error;
    },

    invalidEmail: email => {
      if (Validator.isEmpty(email)) {
        return 'Email is required'
      } else if (!Validator.isEmail(email)) {
        return 'Email is invalid'
      } else {
        return false
      }
    }
  }
}

export default sharedUserUtils