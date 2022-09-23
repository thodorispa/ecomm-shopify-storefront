import React from 'react';
import Head from 'next/head';


const Checkout = () => {
  return (  
    <>
    <Head>
      <title>
        Checkout || Katoi
      </title>
    </Head>
    <header className="container">
      <h1>Proceed to chekcout</h1>
      <section className="checkout-header">
        <h4>Returning customer?</h4>
        <a href="signIn">Click here to login.</a>
      </section>
    </header> 
    </>
  );
}
 
export default Checkout;