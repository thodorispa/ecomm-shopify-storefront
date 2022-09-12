import React, { useState } from "react";
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";

const Home = ({ _products }) => {
  const [products, setProducts] = useState(_products);

  return (
    <header className="container">
      <img
        className="header_img"
        src="https://images.pexels.com/photos/4202926/pexels-photo-4202926.jpeg"
        alt=""
      />
      <article className="showcase">
        <h1 style={{ fontSize: "40px" }}>Welcome to Katoi Soap</h1>
        <p>Katoi is a small business based in Amorgos</p>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ipsum
          veritatis iure, modi, neque delectus id fuga praesentium commodi
          accusamus rem atque magni! Similique ex possimus eius sapiente enim
          eaque.
        </p>
        {/* <article className="featured_c">
          <section>
            <h1>Featured Categories</h1>
          </section>
            <ul className="categories">
              <li>Soaps</li>
              <li>Face Skincare</li>
              <li>Body Skincare</li>
              <li>Shampoo - Showergel</li>
              <li>Beeswax</li>
              <li>Peeling</li>
              <li>Body Oils</li>
            </ul>

        </article> */}
      </article>
    </header>
  );
};

export default Home;
