/* eslint-disable no-case-declarations */

const cartReducer = (state = null, action = {}) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload
    default: return state
  }
}

export default cartReducer;