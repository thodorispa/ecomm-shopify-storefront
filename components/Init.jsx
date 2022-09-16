import { useDispatch } from "react-redux"


const Init = ({ cart, customer }) => {
  const dispatch = useDispatch()

  if (cart) {
    dispatch({ type: "SET_CART", payload: cart})
  }

  if (customer) {
    dispatch({ type: "SET_USER", payload: customer})
  }
  console.log(customer);

  return (  
    null
   );
}

 
export default Init;
