import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AddressFormModal from './AddressFormModal';
import AddAddressModal from './AddAddressModal'
import DeleteAddressModal from './DeleteAddressModal'
import { useDispatch } from 'react-redux';



const CustomerAddresses = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector(x => x.customer);
  const  selectedAddress  = useSelector(x => x.selectedAddress) || null;

  const wrapperRef = useRef(null);
  const [isActive, setIsActive] = useState([].fill(false));
  const [popUp, setPopUp] = useState({
    update: false,
    add: false,
    delete: false,
  });

  const changeSelection = (i, address) => {
    setIsActive(prevState => ({
      [i]: !prevState[i]
    }))
    if (!isActive[i]) {
      dispatch({ type: 'SET_SELECTED_ADDRESS', payload: address })
    } else {
      dispatch({ type: 'DELETE_SELECTION', payload: null })
    }
  }

  

  return (
    <>
      <header className="pref-container">
      <h3 style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}>Οι διευθύνσεις μου</h3>
      </header>
          <article style={{ alignItems: "center" }}>
              <section className="address-header">
                {isActive && selectedAddress ?
                  <>
                    <button
                      className="delete-address-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        setPopUp((prevState) => ({
                          ...prevState,
                          delete: !popUp.delete,
                        }))
                      }}>
                      <i className="fas fa-pen"></i>
                      <span>ΔΙΑΓΡΑΦΗ</span>
                    </button>
                    <DeleteAddressModal trigger={popUp.delete} setPopUp={setPopUp}/>
                    <button
                      className="edit-address-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        setPopUp((prevState) => ({
                          ...prevState,
                          update: !popUp.update,
                        }))
                      }}>
                      <i className="fas fa-pen"></i>
                      <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
                    </button>
                    <AddressFormModal trigger={popUp.update} setPopUp={setPopUp}/>
                  </> :
                  ""}
              </section>  
                {customer.addresses?.map((address, i) => (
                    <article key={i}
                      className='address-container'
                      style={{ borderColor: isActive[`${i}`] && selectedAddress ? "red" : "black" }}
                      onClick={() => {
                          changeSelection(i, address)
                      }}>
                      <section className='address-info'>
                        <span>{address.address1},&nbsp;{address.zip}</span>
                        <span>{address.firstName}&nbsp;{address.lastName}</span>
                      </section>
                      <section className='address-info'>
                        <span>{address.city},&nbsp;{address.country}</span>
                        <span>{address.phone}</span>
                      </section>
                    </article>

                ))}
                <button 
                className="update-address-btn"
                onClick={(e) => {
                  e.preventDefault()
                  setPopUp((prevState) => ({
                    ...prevState,
                    add: !popUp.add,
                  }))
                }}>
                  ΠΡΟΣΘΗΚΗ ΔΙΕΥΘΥΝΣΗΣ</button>
                  <AddAddressModal trigger={popUp.add} setPopUp={setPopUp}  />
          </article>

    </>
  );
}

export default CustomerAddresses;