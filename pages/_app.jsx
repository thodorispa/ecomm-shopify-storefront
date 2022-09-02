import React, { useEffect } from "react";
import App from 'next/app'

import Header from "../components/Header";
import Navbar from "../components/Navbar"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import '../styles/welcome.css';
import '../styles/product_feed.css'


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
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
