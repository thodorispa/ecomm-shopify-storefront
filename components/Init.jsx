import { useEffect } from "react";
import { useDispatch } from "react-redux"


const Init = ({ cart, customer }) => {
  const dispatch = useDispatch()



  cart ? dispatch({ type: "SET_CART", payload: cart }) : null
      

  customer ? dispatch({ type: "SET_USER", payload: customer }) : false
  return (
    null
  );
}


export default Init;
