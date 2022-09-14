import { useDispatch } from "react-redux"


const Init = ({ cart }) => {
  const dispatch = useDispatch()

  if (cart) {
    dispatch({ type: "SET_CART", payload: cart})
  }

  return (  
    null
   );
}

 
export default Init;
