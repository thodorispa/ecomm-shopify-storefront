import React, { useState, useEffect } from "react"
import Head from "next/head";
import Axios from "axios"
import Card from "../../components/Card";
import { cart } from "../../store/reducers/cartReducer.js"
import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie';



const Collection = ({ _collection }) => {
  console.log("hererere");
  
  return (
    <section className="container feed">

    <section id="contact">


    </section>
  </section>
  );
}

export async function getServerSideProps(ctx) {
  const collectionId = ctx.query?.id
  let _collection = null

  try {
    const { data } = await Axios.get(`http://localhost:3000/api/collections/${collectionId}`)

    if (data.product) {
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


