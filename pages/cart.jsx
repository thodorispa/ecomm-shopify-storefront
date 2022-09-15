import React, { useEffect, useState } from 'react';
import Card from '../components/Card'
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Cart = ({ _checkout, _products }) => {
  const dispatch = useDispatch()

  const { cart } = useSelector(x => x)

  const checkout = async () => {
    try {
      const { data } = await Axios.post(`/api/checkout/create`, { lines: cart.lines })
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkout()
  }, [])

  const increaseProductQuantity = async (e,product) => {

    let productId = product.merchandise.id;
    console.log(productId);
    console.log(product);

    // find the product in the cart

    try {
      const { data } = await Axios.post(`/api/cart/add`, { productId, quantity: 1 })
      const { cart } = data

      dispatch({ type: "SET_CART", payload: cart })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="container cart">
      <h1>This is your cart</h1>
    <table className="cart-table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className="th-prod">Product</th>
          <th className="th-price">Price</th>
          <th className="th-quantity">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cart.lines.map((product, i) => (
          <tr key={i}>
                <td><i className="fa-solid fa-xmark"></i></td>
                <td className="cart-prod-img">
                  <img 
                    src={product.merchandise.image.url} 
                    alt={product.merchandise.image.altText}
                  />
                </td>
                <td className="prod-title">{product.merchandise.product.title}</td>
                <td className="cart-price">{product.merchandise.priceV2.amount}&nbsp;{product.merchandise.priceV2.currencyCode}</td>
                <td 
                  style={{padding: "0px"}} 
                  onClick={(e) => decreaseProductQuantity(e,product)}>
                  <i className="fa-solid fa-minus"></i>
                </td>
                {/* <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductQuantity(e,product)}
                />
                </td> */}
                <td 
                  style={{padding: "0px", textAlign: "center", width:"8%"}} 
                  className="prod-quantity">
                  {product.quantity}
                </td>
                <td 
                  style={{padding: "0px"}} 
                  onClick={(e) => increaseProductQuantity(e,product)}>
                  <i className="fa-solid fa-plus"></i>
                </td>
                </tr>
          ))}
      </tbody>
      <thead style={{alignSelf: "flex-end"}}>
        <tr>
          <th>Subtotal</th>
          <th>{cart.cost.subtotalAmount.amount}&nbsp;{cart.cost.subtotalAmount.currencyCode}</th>
        </tr>
      </thead>
    </table>
    </header>
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