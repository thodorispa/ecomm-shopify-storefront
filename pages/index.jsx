import React, { useState } from "react";
import Head from "next/head";
import Collection from '../components/Collection'
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const { collections } = useSelector(x => x);

  return (
    <header className="container">
      <Head>
        <title>Αρχική || Κατώι</title>
      </Head>
      <section className="banner">
        <section className="header-img">
          <img
            className="header_img"
            src="/BACKCOVER.png"
            alt="pra"
          />
        </section>

        <article className="showcase">
          <h1 style={{ fontSize: "40px" }}>Καλωσορίσατε</h1>
          <p>Katoi is a small business based in Amorgos</p>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ipsum
            veritatis iure, modi, neque delectus id fuga praesentium commodi
            accusamus rem atque magni! Similique ex possimus eius sapiente enim
            eaque.
          </p>
        </article>
      </section>
      {collections ? (
        <>
          <section className="showcase-feed">

            {collections?.map((collection, i) => (
              <Collection key={i} collection={collection} />

            ))}
          </section>
          <section className="featured">
            <ul className="featured-c">
              {collections?.map((collection, i) => (
                <Link key={i} href={`/collections/${collection.title}`}>
                  <a className="featured-link">{collection.title}</a>
                </Link>

              ))}
            </ul>
          </section>
        </>
      ) : (
        <section>
          <h2>Φαίνεται να μην υπάρχει κάτι εδώ...</h2>
        </section>
      )}
    </header>
  );
};

export default Home;
