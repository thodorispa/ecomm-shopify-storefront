import update from 'react-addons-update';


const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload || false
    case "UPDATE_SELECTED_ADDRESS":
      const updated = action.payload;
      const index = state.customer.addresses.findIndex(x => x.id === action.payload.id)
      const addresses = state.customer.addresses;
      addresses.splice(index, 1);
      addresses.splice(index, 0, updated);
      return {
        ...state,
        customer: {
          ...state.customer,
          addresses: addresses
        }
      }
    case "DELETE_SELECTED_ADDRESS":
      const deletion = action.payload;
      const index1 = state.customer.addresses.findIndex(x => x.id === action.payload.id)
      const addresses1 = state.customer.addresses;
      addresses1.splice(index1, 1);
      return {
        ...state,
        customer: {
          ...state.customer,
          addresses: addresses1
        }
      }
      case "ADD_NEW_ADDRESS":
        const newAddress = action.payload;
        const addresses2 = state.customer.addresses;
        addresses2.push(newAddress);
        return {
          ...state,
          customer: {
            ...state.customer,
            addresses: addresses2,
          }
        }
        case "UPDATE_DEFAULT_ADDRESS":
          console.log(action.payload);
        return {
          ...state,
          customer: {
            ...state.customer,
            defaultAddress: action.payload,
          }
        }
    default: 
        return state
   
  }
}

export default authReducer