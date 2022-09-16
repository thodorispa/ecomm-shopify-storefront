import React, { useState } from "react";
import Head from "next/head";
import Collection from '../components/Collection'
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";
import { collections } from "../utils/data"



const Home = ({ _products }) => {

  const [products, setProducts] = useState(_products);

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
          {collections?.map((collection, i) => (
            <li key={i} className="featured-link">{collection.name}</li>
          ))}
        </ul>
      </section>
    </header>
  );
};

export default Home;
