import React, { useState, useEffect } from "react"
import Head from "next/head";
import Axios from "axios"
import Card from "../../components/Card";
import { cart } from "../../store/reducers/cartReducer.js"
import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie';



const SingleProduct = ({ _product }) => {
  const dispatch = useDispatch()

  const [product, setProduct] = useState(_product)
  const [quantity, setQuantity] = useState(1)
  const quantityAvailable = product.variants[0].quantityAvailable

  const addToCart = async () => {
    const productId = product.variants[0].id;

    if (quantityAvailable > 0) {
      try {
        const { data } = await Axios.post(`/api/cart/add`, { productId, quantity })
        const { cart } = data

        dispatch({ type: "SET_CART", payload: cart })
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div >
      <Head>
        <title>{product.title} || Amazing Soaps</title>
      </Head>

      <section className="product">
        {product.images[0]?.src && (
          <img
            className="prod_img"
            src={product.images[0].src}
            alt={product.images[0].altText}
          />
        )}
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.variants[0].priceV2.amount + product.variants[0].priceV2.currencyCode}</p>

        <section>
          <input
            type="number"
            min="1"
            max={quantityAvailable}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
          <i 
            style={{ cursor: 'pointer' }} 
            className="fas fa-shopping-cart"
            onClick={addToCart}/>
        </section>

        {quantityAvailable > 0 ? 
          <small>Available quantity {quantityAvailable}</small>
        : <small style={{ color: "red" }}>Out of stock</small>
        }

      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const productId = ctx.query?.id
  let _product = null

  try {
    const { data } = await Axios.get(`http://localhost:3000/api/product/${productId}`)

    if (data.product) {
      _product = data.product
    } else {
      // Return 404
      return {
        notFound: true,
      }
    }
  } catch (err) {
    // Return 404
    return {
      notFound: true,
    }
  }

  return {
    props: { _product }
  }
}

export default SingleProduct


