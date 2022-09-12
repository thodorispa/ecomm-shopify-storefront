import React, { useState } from "react"
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import Axios from "axios";

const Home = ({ _products }) => {
  const [ products, setProducts ] = useState(_products)

  return (
    <header>
      <h1></h1>
    </header>
  );
}

export default Home;


