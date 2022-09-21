/* eslint-disable no-case-declarations */

const sideCartReducer = (state = {}, action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      return action.payload
    default: return state
  }
}

export default sideCartReducer;