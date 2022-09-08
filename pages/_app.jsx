import React, { useEffect, useState } from "react";
import App from 'next/app'

import Card from "../components/Card";
import Navbar from "../components/Navbar";

import '../styles/navbar.css';
import '../styles/welcome.css';
import '../styles/product_feed.css'
import '../styles/product_details.css'
import '../styles/cart.css'
import '../styles/register.css'


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      {/* <Header {...pageProps} /> */}
      <Navbar {...pageProps} />
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const { pageProps } = await App.getInitialProps(ctx)
  return { pageProps }
}

export default MyApp;
