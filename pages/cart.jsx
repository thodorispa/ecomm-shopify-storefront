import React, { useState } from 'react';
import Card from '../components/Card'
import Axios from 'axios';

const Cart = ({ _checkout, _products }) => {

  const [products, setProduct] = useState(_products)
  console.log(products);
  return (
    <div className="cart">
      <h1>This is your cart</h1>

      <div className="feed">

        {products?.map((product, i) => (
          <Card product={product} />
        ))}

      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = ctx.req.headers.cookie;
    const checkout = cookies.split(';').find(c => c.trim().startsWith('checkout=')).split('=')[1];

    if (checkout) {
      var { data } = await Axios.get(`http://localhost:3000/api/cart`, {
        headers: {
          cookie: checkout
        }
      })
    }

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