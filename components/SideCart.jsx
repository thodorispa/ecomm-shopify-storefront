import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Router, { useRouter } from 'next/router';
import Link from "next/link";
import Axios from "axios";

const SideCart = () => {

  const { cart, sideNav, cartClasses } = useSelector(x => x);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false)

  const handleProductQuantity = async (product, status) => {

    const productId = product.merchandise.id;
    const lineId = product.id

    try {
      setIsLoading(true);
      const { data } = await Axios.post(`/api/cart/${status}`, { productId, lineId })
      const { cart } = data

      dispatch({ type: "SET_CART", payload: cart })
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const viewCartOnClick = () => {
    dispatch({ type: "TOGGLE_CART", payload: "side-cart" })
    dispatch({ type: "TOGGLE_NAV", payload: !sideNav})
  }

  return ( 
    <header>
      <article className={cartClasses}>
        {!cart || cart.lines == 0 ? (
          <h2 style={{alignSelf: "center", padding: "20px"}}>Your shopping cart is empty</h2>
        ) : (
          <>
          <h2 style={{alignSelf: "center", padding: "20px"}}>Your shopping cart</h2>
        <article className="side-cart-list">
          {cart.lines.map((product,i) => (
            <div key={i} style={{marginBottom: "20px", width: "100%"}}>
            <section style={{justifyContent: "flex-start"}}>
            <i
                  className="fa-solid fa-xmark"
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => handleProductQuantity(product, "remove")}
                />
              <div style={{padding: "10px"}} className="cart-prod-img">
                <img
                  src={product.merchandise.image?.url}
                  alt={product.merchandise.image?.altText}/>
              </div>
              <article style={{alignItems: "flex-start", padding: "10px"}}>
              <span>{product.quantity}&nbsp;x&nbsp;{product.merchandise.product.title}</span>
              <span>{product.merchandise.priceV2.amount}&nbsp;{product.merchandise.priceV2.currencyCode}</span>
              </article>
            </section>
            </div>
          ))}
        </article>
        <section style={{alignSelf: "center"}}>
          {isLoading ? (
              <div className="loadingio-spinner-ripple-hb4ksrtc1us"><div className="ldio-uua8zfoilp">
              <div></div><div></div>
              </div></div>
          ) : (
            <>
            <h2>Subtotal&nbsp;&nbsp;</h2>
            <h2>{cart.cost.subtotalAmount.amount}&nbsp;{cart.cost.subtotalAmount.currencyCode}</h2>
            </>
          )}
        </section>
        <section style={{width: "100%"}}>
          <Link href="/cart">
            <button 
            style={{width: "100%"}} 
            className="register-btn"
            onClick={viewCartOnClick}
            >VIEW CART</button>
          </Link>
        </section>
        </>
        )}  
        
      </article>
    </header>
   );
}
 
export default SideCart;