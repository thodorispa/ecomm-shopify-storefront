import React, { useEffect, useState } from "react";
import App from 'next/app'
import { Provider } from 'react-redux';
import { store } from "../store/index";

import Navbar from "../components/Navbar";
import Init from "../components/Init";


import '../styles/navbar.css';
import '../styles/welcome.css';
import '../styles/product_feed.css'
import '../styles/product_details.css'
import '../styles/cart.css'
import '../styles/register.css'
import '../styles/main.css'
import '../styles/loader.css'


const MyApp = ({ Component, pageProps }) => {
  const { cart } = pageProps
  
  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      <Navbar {...pageProps} />
      <Init {...pageProps} cart={cart} />
      <Component {...pageProps} />

    </Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const { pageProps } = await App.getInitialProps(ctx)
  const  cart = ctx?.ctx?.req?.cart 
  return { pageProps: { ...pageProps, cart } }
}

export default MyApp;
