import React from 'react';

const TabMenu = ({option, security, orderHistory, shipping}) => {
  const showSecurityMenu = () => {
    console.log("in");
    security();
  }
  
  const showOrderHistory = () => {
    console.log("in");
    orderHistory();
  }

  return ( 
  
    <>
    <header id="side-menu-container">
      <section className="side-menu">
        <ul className="side-menu-options">
          <li className={`menu-option ${option === 1 ? 'option-active' : ''}`} onClick={() => security()}>Ασφάλεια</li>
          <li>/</li>
          <li className={`menu-option ${option === 2 ? 'option-active' : ''}`} onClick={() => shipping()}>Στοιχεία διεύθυνσης</li>
          <li>/ </li>
          <li className={`menu-option ${option === 3 ? 'option-active' : ''}`} onClick={() => orderHistory()}>Ιστορικό Παραγγελιών</li>
        </ul>
      </section>
    </header>
    </>
   );
}
 
export default TabMenu;