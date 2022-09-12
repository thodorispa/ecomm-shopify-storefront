/* eslint-disable no-case-declarations */

const cart = (state = { cart: [] }, action = {}) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cart : action.payload
      }
    // case "ADD_TO_CART":
    //   const item = state.cart?.find(item => item.id === action.payload.id)
    //   if (!item) {
    //     console.log("item not found");
    //     return {
    //       ...state,
    //       cart: [...state.cart, action.payload]
    //     }
    //   } else {
    //     console.log("item  found");

    //     return {
    //       ...state,
    //       cart: state.cart.map(item => {
    //         if (item.id === action.payload.id) {
    //           return {
    //             ...item,
    //             quantity: item.quantity + 1
    //           }
    //         }
    //         return item
    //       })
    //     }
    //   }
    case "SET_FOCUSED_COLLECTION":
      return {
        ...state,
        focused: action.payload
      }

    default: return state
  }
}

export default cart