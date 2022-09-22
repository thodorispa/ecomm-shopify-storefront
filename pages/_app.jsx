import React, { useEffect, useState } from "react";
import App from 'next/app'
import { Provider } from 'react-redux';
import { store } from "../store/index";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideCart from "../components/SideCart";
import Init from "../components/Init";


import '../styles/navbar.css';
import '../styles/welcome.css';
import '../styles/product_feed.css'
import '../styles/product_details.css'
import '../styles/cart.css'
import '../styles/register.css'
import '../styles/main.css'
import '../styles/loader.css'
import '../styles/footer.css'


const MyApp = ({ Component, pageProps }) => {
  const { cart } = pageProps
  const { customer } = pageProps
  const { cartClasses } = pageProps
  const { sideNav } = pageProps
  

  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />

      <Init {...pageProps} cart={cart} cartClasses={cartClasses}/>
      <Navbar {...pageProps} customer={customer} />
      <Component {...pageProps} />
      <Footer {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const { pageProps } = await App.getInitialProps(ctx)
  const  cart = ctx?.ctx?.req?.cart 
  const  customer = ctx?.ctx?.req?.customer 
  return { pageProps: { ...pageProps, cart, customer} }
}

export default MyApp;
