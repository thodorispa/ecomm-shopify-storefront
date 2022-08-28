import React, { useEffect } from "react";
import App from 'next/app'

import Header from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header {...pageProps} />
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const { pageProps } = await App.getInitialProps(ctx)
  return { pageProps }
}

export default MyApp;
