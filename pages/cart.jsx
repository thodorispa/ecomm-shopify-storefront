import React, { useEffect, useState } from 'react';
import Card from '../components/Card'
import Axios from 'axios';
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

  return (
    <header className="container cart">
      <h1>This is your cart</h1>
      <table className="cart-table">
        {!cart || cart.lines == 0 ? (
          <thead>
            <tr>
              <th>Your shopping cart is empty</th>
              <th>
                <a href="/products">Shop Here</a>
              </th>
            </tr>
          </thead>
          ) : (
            <>
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
              <td>
                <i
                  className="fa-solid fa-xmark"
                  style={{ padding: "0px", cursor: "pointer" }}
                  onClick={() => handleProductQuantity(product, "remove")}
                />
              </td>
              <td className="cart-prod-img">
                <img
                  src={product.merchandise.image.url}
                  alt={product.merchandise.image.altText}
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
              {/* <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductQuantity(e,product)}
                />
                </td> */}
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
            <th>Subtotal</th>
            {isLoading ? (
              <th className="spinner">
              <div class="loadingio-spinner-ripple-hb4ksrtc1us"><div class="ldio-uua8zfoilp">
              <div></div><div></div>
              </div></div>
              </th>
            ) : <th>{cart.cost.subtotalAmount.amount}&nbsp;{cart.cost.subtotalAmount.currencyCode}</th>}
          </tr>
        </thead>
        </>
          )}
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