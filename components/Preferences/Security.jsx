import React from 'react';
import {useSelector} from 'react-redux'

const Security = () => {
  const { customer } = useSelector (x => x.customer);
  console.log(customer);
  return ( 
    <>
    <header>
      <h1>Your personal info</h1>
    </header>
    
    </> 
   );
}
 
export default Security;