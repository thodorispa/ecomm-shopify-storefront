import React from "react"
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import Card from "../../components/Card";
import { useEffect, useState } from "react";

const AllProducts = ({ _products }) => {
  const [products, setProducts] = useState(_products)
  return (
    <>

      <Head>
        <title>Welcome to Katoi</title>
      </Head>

      <section className="container feed">

        {products?.map((product, i) => (
          <Link key={i} href={`/products/${product.title}`}>
            <a><Card product={product} /></a>
          </Link>
        ))}

        <section id="contact">


        </section>
      </section>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  let _products = null
  try {
    const { data } = await Axios.get(`http://localhost:3000/api/product/all`)

    if (data.products) {
      _products = data.products
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
    props: { _products }
  }
}

export default AllProducts;


