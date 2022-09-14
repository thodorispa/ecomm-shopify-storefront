import React, { useState } from 'react';
import Card from '../components/Card'
import Axios from 'axios';
import { useSelector } from 'react-redux';

const Cart = ({ _checkout, _products }) => {

  const [products, setProduct] = useState(_products)
  const { cart } = useSelector(x => x)
  console.log(cart);

  return (
    <div className="cart">
      <h1>This is your cart</h1>

      <div className="feed">

        {products.map((product, i) => (
          <Card product={product} />
        ))}

      </div>
    </div>
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