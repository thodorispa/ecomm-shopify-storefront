import React, { useState } from "react"
import Head from "next/head";
import Axios from "axios"
import Card from "../../components/Card";
import { cart } from "../../store/cart"
import { useSelector, useDispatch } from "react-redux"



const SingleProduct = ({ _product }) => {
  const dispatch = useDispatch()

  const [product, setProduct] = useState(_product)
  const { cart } = useSelector(x => x)
  console.log(cart);


  const addToCart = (e) => {
    e.preventDefault()

    const productId = product.variants[0].id;
    // get the line id by productVariantId in cart
    // const lineItem = cart.lineItems.find(x => x.variantId === productId)

    Axios.post(`http://localhost:3000/api/cart/add`, { productId })
      .then(res => {
        dispatch({ type: "SET_CART", payload: res.data})

      })
      .catch(err => {
        console.log(err)
      })
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

        <div className="add_btn">
          <i className="fas fa-shopping-cart"></i>
          <p onClick={(e) => {
            addToCart(e);
          }}>
            ADD TO CART
          </p>
        </div>
      </section>
    </div>
  );
}
// This gets called on every request
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


