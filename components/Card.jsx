import React from 'react';
import Axios from "axios";

const Card = ({product}) => {

  return ( 
    <div className="card">
      <div className="container">
      {product.images[0]?.src && (
          <img 
            src={product.images[0].src} 
            alt={product.images[0].altText}
          />
        )}
        <h2>{product.title}</h2>  
        <p>{product.description}</p>
        <p>{product.variants[0].priceV2.amount}</p>
      </div>
    </div>
   );
}

 
export default Card;