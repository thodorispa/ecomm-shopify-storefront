/* eslint-disable no-case-declarations */

const collectionsReducer = (state = null, action = {}) => {
  switch (action.type) {
    case "SET_COLLECTIONS":
      return action.payload
    default: return state
  }
}

export default collectionsReducer;