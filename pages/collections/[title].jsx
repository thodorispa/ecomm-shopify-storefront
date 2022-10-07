import React, { useState, useEffect } from "react"
import Head from "next/head";
import Axios from "axios"
import Card from "../../components/Card";
import Link from "next/link";



const Collection = ({ _collection }) => {

  return (
    <>
      <Head>
        <title>{ _collection.title } || Welcome to Katoi</title>
      </Head>

      <header className="container">
        <article className="collection-header">
          <h1 style={{fontWeight: "100"}}>Εξερευνήστε προϊόντα&nbsp;{_collection.title}</h1>
        </article>
        <section className="feed">
          {_collection.products?.map((product, i) => (
            <Link key={i} href={`/products/${product.title}`}>
              <a><Card product={product} /></a>
            </Link>
          ))}
      </section>
      </header>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let collectionTitle = encodeURIComponent(ctx.query?.title)

  let _collection = null

  try {
    const { data } = await Axios.get(`http://localhost:3000/api/collections/${collectionTitle}`)

    if (data.collection) {
      _collection = data.collection
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
    props: { _collection }
  }
}

export default Collection


