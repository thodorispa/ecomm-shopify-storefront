import React, { useEffect, useState } from "react";
import App from 'next/App'
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
import '../styles/checkout.css'
import '../styles/contact.css'
import '../styles/sidemenu.css'
import '../styles/preferences.css'


const MyApp = ({ Component, pageProps }) => {
  const { cart } = pageProps
  const { customer } = pageProps
  const { collections } = pageProps
  const { cartClasses } = pageProps
  const { sideNav } = pageProps


  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      {/* <GrowlScene /> */}
      <Init {...pageProps} cart={cart} collections={collections} cartClasses={cartClasses} />
      <Navbar {...pageProps} customer={customer} />
      <Component {...pageProps} />
      <Footer {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const { pageProps } = await App.getInitialProps(ctx)
  const cart = ctx?.ctx?.req?.cart
  const customer = ctx?.ctx?.req?.customer
  const collections = ctx?.ctx?.req?.collections
  return { pageProps: { ...pageProps, cart, customer, collections } }
}

export default MyApp;
