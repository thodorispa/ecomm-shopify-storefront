import React, { useState } from "react";
import Head from "next/head";
import Collection from '../components/Collection'
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";
import { collections } from "../utils/data"



const Home = ({ _collections }) => {
  console.log(_collections[0]);

  return (
    <header className="container">
      <section className="banner">
        <section className="header-img">
          <img
            className="header_img"
            src="../styles/BACKCOVER"
            alt="pra"
          />
        </section>

        <article className="showcase">
          <h1 style={{ fontSize: "40px" }}>Welcome to Katoi Soap</h1>
          <p>Katoi is a small business based in Amorgos</p>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ipsum
            veritatis iure, modi, neque delectus id fuga praesentium commodi
            accusamus rem atque magni! Similique ex possimus eius sapiente enim
            eaque.
          </p>
        </article>
      </section>
      <section className="showcase-feed">
        {collections?.map((collection, i) => (
          <Collection key={i} collection={collection} />

        ))}
      </section>
      <section className="featured">
        <ul className="featured-c">
          {_collections?.map((collection, i) => (
            <Link key={i} href={`/collections/${collection.id}`}>
             <a className="featured-link">{collection.name}</a>
          </Link>
            
          ))}
        </ul>
      </section>
    </header>
  );
};


export async function getServerSideProps(ctx) {
  let _collections = null
  try {
    const { data } = await Axios.get(`http://localhost:3000/api/collections/`)

    if (data.collections) {
      _collections = data.collections
    } else {
      // Return 404
      return {
        notFound: true,
      }
    }
  } catch (err) {
    console.log(err);
    // Return 404
    return {
      notFound: true,
    }
  }

  return {
    props: { _collections }
  }
}

export default Home;
