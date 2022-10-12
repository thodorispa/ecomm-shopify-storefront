
const authReducer = (state = false, action) => {
  let existingAddresses = state?.addresses;
  switch (action.type) {
    case "SET_USER":
      return action.payload || false
    case "UPDATE_SELECTED_ADDRESS":
      const updated = action.payload;
      const index = state.customer?.addresses.findIndex(x => x.id === action.payload.id)
      existingAddresses.splice(index, 1);
      existingAddresses.splice(index, 0, updated);
      return {
        ...state,
        addresses: existingAddresses
      }
    case "DELETE_SELECTED_ADDRESS":
      const index1 = state.customer.addresses.findIndex(x => x.id === action.payload.id)
      existingAddresses.splice(index1, 1);
      return {
        ...state,
        addresses: existingAddresses
      }
    case "ADD_NEW_ADDRESS":
      const newAddress = action.payload;
      existingAddresses.push(newAddress);
      return {
        ...state,
        addresses: existingAddresses,
      }
    case "UPDATE_DEFAULT_ADDRESS":
      const oldDefaultIndex = state.addresses?.findIndex(x => x.id === state.defaultAddress.id)
      const newDefaultIndex = state.addresses?.findIndex(x => x.id === action.payload.id)

      // swap places of old default and new default
      const temp = existingAddresses[oldDefaultIndex];
      existingAddresses[oldDefaultIndex] = existingAddresses[newDefaultIndex];
      existingAddresses[newDefaultIndex] = temp;

      return {
        ...state,
        defaultAddress: action.payload,
        addresses: existingAddresses
      }
    default:
      return state

  }
}

export default authReducer