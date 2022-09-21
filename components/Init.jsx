import { useEffect } from "react";
import { useDispatch } from "react-redux"


const Init = ({ cart, customer, cartClasses }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    cart && dispatch({ type: "SET_CART", payload: cart })
  }, [cart])

  useEffect(() => {
    customer && dispatch({ type: "SET_USER", payload: customer })
  }, [customer])
  useEffect(() => {
    cartClasses && dispatch({ type: "TOGGLE_CART", payload: cartClasses })
  }, [cartClasses])

  return (
    null
  );
}


export default Init;
