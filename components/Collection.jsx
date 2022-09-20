import React from 'react';
import Link from "next/link";

const Collection = ({ collection }) => {


  return (
    <article className="card">
      <article className="card-image-container">
        <img
          src="https://www.merionpartners.com/wp-content/uploads/2015/10/400x4005.png"
        />
      </article>

      <section style={{ alignSelf: "flex-start" }}>
        <Link href={`/collections/${collection.title}`}>
          <a/>
        </Link>
        <h2>{collection.title}</h2>
      </section>

    </article>
  );
}


export default Collection;