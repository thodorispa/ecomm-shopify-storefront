import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NotFound = () => {
  const router = useRouter()

  return (
    <section>
      <Head>
        <title>404 || Soaps</title>
      </Head>
      
      <h2>Page not found</h2>
      <div className="spacer" />
      <div className="spacer" />
      <button
        onClick={() => {
          router.push('/')
        }}
      >Home</button>
    </section>
  );
}

export default NotFound