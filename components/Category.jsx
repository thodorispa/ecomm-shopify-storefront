import React from 'react';
import Axios from "axios";

const Category = ({category}) => {

  return ( 
    <article className="card">
      <article className="card-image-container">
          <img 
            src="https://www.merionpartners.com/wp-content/uploads/2015/10/400x4005.png"
          />
      </article>
      <section style={{alignSelf: "flex-start"}}>
        <h2>{category.title}</h2>  
        </section>
    </article>
   );
}

 
export default Category;