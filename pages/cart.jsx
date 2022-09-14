import React, { useState } from 'react';
import Card from '../components/Card'
import Axios from 'axios';
import { useSelector } from 'react-redux';

const Cart = ({ _checkout, _products }) => {

  const { cart } = useSelector(x => x)

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
          <tr>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td className="cart-prod-img">
                  <img 
                    src={product.merchandise.image.url} 
                    alt={product.merchandise.image.altText}
                  />
                </td>
                <td className="prod-title">{product.merchandise.product.title}</td>
                <td className="cart-price">{product.merchandise.priceV2.amount}&nbsp;{product.merchandise.priceV2.currencyCode}</td>
                <td className="prod-quantity">{product.quantity}</td>
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