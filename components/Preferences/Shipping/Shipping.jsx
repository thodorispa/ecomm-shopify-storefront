import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddressForm from './AddressForm';


const Shipping = () => {

  const { customer } = useSelector(x => x.customer);
  const [disabled, setDisabled] = useState({
    input: true,
    button: false,
  })
  const [selectedAddress, setSelectedAddress] = useState()
  const [isActive, setIsActive] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const [phone, setPhone] = useState();

  const [addressData, setAddressData] = useState({
    address1: "",
    city: "",
    zip: "",
  })  

  const handleAddressData = input => e => {
    const { value } = e.target
    setAddressData(prevState => ({
      ...prevState,
      [input]: value,
    }))
  }

  const edit = (e) => {
    e.preventDefault();
    setDisabled(prevState => ({
      ...prevState,
      input: !disabled.input
    }));

    if (!disabled.input) {
      setDisabled(prevState => ({
        ...prevState,
        input: true,
        button: true,
      }))
    }
  }

  return (
    <>
      <header className="pref-container">
      </header>
      <article>
        <section className="form-container">
          <article style={{ alignItems: "center" }}>
            <form className="forms">
              <section>
                <h3 style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}>Personal Information</h3>
                {selectedAddress ?
                  <>
                    <button
                      className="edit-btn"
                      style={{width: "30%"}}
                      onClick={(e) => {
                        e.preventDefault()
                        setPopUp(!popUp)
                      }}>
                      <i className="fas fa-pen"></i>
                      <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
                    </button>
                    <AddressForm trigger={popUp} popUp={popUp} setPopUp={setPopUp} address={selectedAddress} />
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
                      style={{ borderColor: isActive[`${i}`] ? "red" : "black" }}
                      onClick={() => {
                        setIsActive(current => !current);
                        setSelectedAddress(address)
                        setIsActive(prevState => ({
                          [i]: !prevState[i]
                        }))
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
              <article style={{ alignItems: "center" }}>
                <button
                  className="register-btn"
                  onClick={edit}
                  disabled={disabled.button}
                >{disabled.input && !disabled.button ? <span>ΕΠΕΞΕΡΓΑΣΙΑ</span> : <span>ΕΝΗΜΕΡΩΣΗ</span>}</button>
              </article>


            </form>
          </article>
        </section>
      </article>

    </>
  );
}

export default Shipping;