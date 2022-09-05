import React, {useState} from 'react';
import Card from '../components/Card'
import Axios from 'axios';

const Cart = ({ _products }) => {

  const [products, setProduct] = useState(_products)

  console.log(products);
  return ( 
      <div className="cart">
        <h1>This is your cart</h1>
        <div className="feed">
        {products?.map((product, i) => (
            <Card product={product} />
       ))}
        </div>
      </div>
   );
}

export async function getServerSideProps() {
  try {

    const { data } = await Axios.get(`http://localhost:3000/api/cart`)
    // const _products = ['loufa', 'diarhea', 'korada', 'charcoal']
    const _products = data.products || []
    
    console.log(data);
    return {
      props: {
        _products
      }
    }
  } catch (err) {
    return {
      props: {
        _products: [],
      }
    }
  }
}
 
export default Cart;