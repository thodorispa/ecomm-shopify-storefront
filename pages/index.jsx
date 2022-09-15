import React, { useState } from "react";
import Head from "next/head";
import Category from '../components/Category'
import { useEffect } from "react";
import Link from "next/link";
import { categories } from "../utils/categoriesData";
import Axios from "axios";

const Home = ({ _products }) => {

  const [products, setProducts] = useState(_products);


  const f_categories = [
    {
      title: 'Soap Bars'
    },
    {
      title: 'Face'
    },
    {
      title: 'Body'
    }
  ]
  console.log(f_categories);
  return (
    <header className="container">
      <section className="banner">
      <section className="header-img">
      <img
        className="header_img"
        src="https://images.pexels.com/photos/4202926/pexels-photo-4202926.jpeg"
        alt=""
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
      {f_categories?.map((category, i) => (
          <Link key={i} href="/">
            <a>
              <Category category={category} />
            </a>
          </Link>
        ))}
      </section>
      <section className="featured">
      <ul className="featured-c">
        {categories?.map((category, i) => (
            <li key={i} className="featured-link">{category.name}</li>
        ))}
         </ul>
      </section>
    </header>
  );
};

export default Home;
