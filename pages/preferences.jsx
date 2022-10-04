import React, { useState, useEffect } from 'react';
import TabMenu from '../components/TabMenu'
import Security from '../components/Preferences/Security'
import CustomerAddresses from '../components/Preferences/Addresses/CustomerAddresses'

const Preferences = () => {

  const [option, setOption] = useState(1);

  const showSecurityOption = () => {
    setOption(1);
  }
  const showShippingOption = () => {
    setOption(2);
  }
  const showOrderHistory = () => {
    setOption(3);
  }

  useEffect(() => {

  }, [])

  switch (option) {
    case 1: {
      return (
        <>
          <TabMenu option={option} security={showSecurityOption} orderHistory={showOrderHistory} customerAddresses={showShippingOption} />
          <Security />
        </>
      )
    } case 2: {
      return (
        <>
          <TabMenu option={option} security={showSecurityOption} orderHistory={showOrderHistory} customerAddresses={showShippingOption} />
          <CustomerAddresses />
        </>
      )
    } case 3: {
      return (
        <>
          <TabMenu option={option} security={showSecurityOption} orderHistory={showOrderHistory} customerAddresses={showShippingOption} />
          <header>
            <h1>
              gre
            </h1>
          </header>
        </>
      )
    } default:
      return (
        <header>
          <h1>There's nothing here...</h1>
        </header>
      )
  }
}

export default Preferences;