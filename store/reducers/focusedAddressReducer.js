/* eslint-disable no-case-declarations */
const selectedAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_ADDRESS":
      return action.payload
    case "DELETE_SELECTION":
      return action.payload
    default: return state
  }
}

export default selectedAddressReducer;