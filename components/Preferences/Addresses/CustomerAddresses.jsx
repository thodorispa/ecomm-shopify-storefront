import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddressFormModal from './AddressFormModal';
import { useDispatch } from 'react-redux';


const CustomerAddresses = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector(x => x.customer);
  const  selectedAddress  = useSelector(x => x.selectedAddress) || null;

  const [isActive, setIsActive] = useState(false);
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      <header className="pref-container">
      </header>
      <article>
        <section className="form-container">
          <article style={{ alignItems: "center" }}>
            <form className="forms">
              <section>
                <h3 style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}> Personal Information </h3>
                {isActive ?
                  <>
                    <button
                      className="edit-btn"
                      style={{ width: "30%" }}
                      onClick={(e) => {
                        e.preventDefault()
                        setPopUp(!popUp)
                      }}>
                      <i className="fas fa-pen"></i>
                      <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
                    </button>
                    <AddressFormModal trigger={popUp} setPopUp={setPopUp}/>
                  </> :
                  ""}
              </section>

              <article>
                {customer.addresses.map((address, i) => (
                  <section
                    key={i}
                    style={{
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}

                  >
                    <article
                      className='address-container'
                      style={{ borderColor: isActive ? "red" : "black" }}
                      onClick={() => {
                        dispatch({ type: 'SET_SELECTED_ADDRESS', payload: address })
                        setIsActive(!isActive)
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
                  </section>

                ))}
              </article>
            </form>
          </article>
        </section>
      </article>

    </>
  );
}

export default CustomerAddresses;