import { useEffect } from "react";
import { useDispatch } from "react-redux"


const Init = ({ cart, customer }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    cart && dispatch({ type: "SET_CART", payload: cart })
  }, [cart])

  useEffect(() => {
    customer && dispatch({ type: "SET_USER", payload: customer })
  }, [customer])

  return (
    null
  );
}


export default Init;
