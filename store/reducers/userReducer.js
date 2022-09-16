const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload || false
    default: 
      return state
  }
}

export default authReducer