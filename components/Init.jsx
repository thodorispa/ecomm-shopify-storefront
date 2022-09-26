import { useEffect } from "react";
import { useDispatch } from "react-redux"


const Init = ({ cart, customer, collections, cartClasses, sideNav }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    cart && dispatch({ type: "SET_CART", payload: cart })
  }, [cart])

  useEffect(() => {
    customer && dispatch({ type: "SET_USER", payload: customer })
  }, [customer])

  useEffect(() => {
    collections && dispatch({ type: "SET_COLLECTIONS", payload: collections })
  }, [collections])

  useEffect(() => {
    cartClasses && dispatch({ type: "TOGGLE_CART", payload: cartClasses })
  }, [cartClasses])

  useEffect(() => {
    sideNav && dispatch({ type: "TOGGLE_NAV", payload: sideNav })
  }, [sideNav])

  return (
    null
  );
}


export default Init;
