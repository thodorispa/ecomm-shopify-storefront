import React, { useEffect, useState } from 'react';
import Card from '../components/Card'
import Axios from 'axios';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

const Cart = ({ _checkout, _products }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useSelector(x => x)

  const handleProductQuantity = async (product, status) => {
    const productId = product.merchandise.id;
    const lineId = product.id
    const quantity = status === "update" ?  product.quantity-1 : 1

    try {
      setIsLoading(true);
      const { data } = await Axios.post(`/api/cart/${status}`, { productId, quantity , lineId })
      const { cart } = data

      dispatch({ type: "SET_CART", payload: cart })
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  const checkoutOnClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`api/checkout/create`, {cart})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <header className="container">
       <Head>
        <title>Καλλάθι Αγορών || Κατώιο</title>
      </Head>
      </header>
      <article className="cart">

      
      <h1>Καλάθι Αγορών</h1>
      <table className="cart-table">
        {!cart || cart.lines == 0 ? (
          <thead>
            <tr>
              <th>Το καλάθι αγορών σας είναι άδειο</th>
              <th>
                <a href="/products">Ψωνίστε εδώ</a>
              </th>
            </tr>
          </thead>
          ) : (
            <>
            <thead>
            <tr>
            <th>&nbsp;</th>
            <th className="th-prod">Προϊόν</th>
            <th className="th-price">Τιμή</th>
            <th className="th-quantity">Ποσότητα</th>
          </tr>
        </thead>
        <tbody>
          {cart.lines.map((product, i) => (
            <tr key={i}>
              <td>
                <i
                  className="fa-solid fa-xmark"
                  style={{ padding: "0px", cursor: "pointer" }}
                  onClick={() => handleProductQuantity(product, "remove")}
                />
              </td>
              <td className="cart-prod-img">
                <img
                  src={product.merchandise.image?.url}
                  alt={product.merchandise.image?.altText}
                />
              </td>
              <td className="prod-title">{product.merchandise.product.title}</td>
              <td className="cart-price">{product.merchandise.priceV2.amount}&nbsp;{product.merchandise.priceV2.currencyCode}</td>
              <td style={{ padding: "0px" }}>
                <i
                  className="fa-solid fa-minus"
                  style={{ padding: "0px", cursor: "pointer" }}
                  onClick={() => handleProductQuantity(product, "update")}
                />
              </td>
              <td
                style={{ padding: "0px", textAlign: "center", width: "8%" }}
                className="prod-quantity">
                {product.quantity}
              </td>
              <td style={{ padding: "0px" }}>
                <i
                  className="fa-solid fa-plus"
                  style={{ padding: "0px", cursor: "pointer" }}
                  onClick={() => handleProductQuantity(product, "add")}
                />
              </td>
              
            </tr>
          ))}
        </tbody>
        
        <thead className="subtotal">
          <tr>
            <th>Σύνολο</th>
            {isLoading ? (
              <th className="spinner">
              <div className="loadingio-spinner-ripple-hb4ksrtc1us"><div className="ldio-uua8zfoilp">
              <div></div><div></div>
              </div></div>
              </th>
            ) : <th>{cart.cost.subtotalAmount.amount}&nbsp;{cart.cost.subtotalAmount.currencyCode}</th>}
          </tr>
        </thead>
        </>
          )}
      </table>
      <button 
      style={{alignSelf: "flex-end"}}
      className="register-btn"
      onClick={checkoutOnClick}>
        ΠΛΗΡΩΜΗ
      </button>
      </article>  
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const _checkout = data.checkout || []
    const _products = data.products || []

    return {
      props: {
        _checkout,
        _products
      }
    }
  } catch (err) {
    return {
      props: {
        _products: [],
      }
    }
  }
}
export default Cart;