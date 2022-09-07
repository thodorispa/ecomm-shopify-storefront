import React, { useState } from "react"
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";

const Home = ({ _products }) => {
  const [ products, setProducts ] = useState(_products)

  return (
    <div className="welcome">
      <img className="header_img" src="https://images.pexels.com/photos/4202469/pexels-photo-4202469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
     <header className="showcase">
      <h1>Welcome to Katoi Soap</h1>
      <section>
      <p>
        Katoi is a small business based in Amorgos
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  
        Earum, ipsum veritatis iure, modi, neque delectus id fuga praesentium commodi 
        accusamus rem atque magni! Similique ex possimus eius sapiente enim eaque.</p>
    </section>
      </header>
      <section className="featured_c">
        <h1>Featured Categories</h1>
        <ul className="categories">
          <li>Soaps</li>
          <li>Face Skincare</li>
          <li>Body Skincare</li>
          <li>Shampoo - Showergel</li>
          <li>Beeswax</li>
          <li>Peeling</li>
          <li>Body Oils</li>
        </ul>
      </section>
      <section>

      </section>
    </div>
  );
}

export default Home;


