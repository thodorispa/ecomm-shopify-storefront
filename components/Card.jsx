import React from 'react';
import Axios from "axios";

const Card = ({product}) => {
  
  return ( 
    <article className="card">
      <article className="card-image-container">
      {product.images[0]?.src && (
          <img 
            src={product.images[0].src} 
            alt={product.images[0].altText}
          />
        )}
      </article>
      <section style={{alignSelf: "flex-start"}}>
        <h2>{product.title}</h2>  
        <p>{product.variants[0].priceV2.amount}</p>
        </section>
    </article>
   );
}

 
export default Card;