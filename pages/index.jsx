import React, { useState } from "react"
import Head from "next/head";
import { useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import Axios from "axios";

const Home = ({ _products }) => {
  const [ products, setProducts ] = useState(_products)

  return (
    <div className="welcome">
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
    
    </div>
  );
}

export default Home;


