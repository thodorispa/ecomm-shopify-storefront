import React from 'react';
import Axios from "axios";

const Card = ({product}) => {

  return ( 
    <div className="card">
      <div className="container">
      {product.media?.src && (
          <img 
            src={product.media.src} 
            alt={product.media.alt}
          />
        )}
        <h2>{product.title}</h2>
        <p>{product.id}</p>
      </div>
    </div>
   );
}

 
export default Card;