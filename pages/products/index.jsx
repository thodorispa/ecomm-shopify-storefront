import React from "react"
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import Card from "../../components/Card";
import { useEffect, useState } from "react";


const AllProducts = ({ _products }) => {
  const [ products, setProducts ] = useState(_products)

  return (
    <>
      <Head>
        <title>Welcome to Katoi</title>
      </Head>

      <section className="feed">
        
                {products?.map((product, i) => (
                      <Link href={`/products/${product.id}`}>
                        <a>
                        <Card product={product} />
                        </a>
                         
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
  try {
    const { data } = await Axios.get(`http://localhost:3000/api/product/all`)


    const _products = data.products || []

    return {
      props: {
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

export default AllProducts;


