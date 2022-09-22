/* eslint-disable no-case-declarations */

const sideNavReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_NAV":
      return action.payload
    default: return state
  }
}

export default sideNavReducer;