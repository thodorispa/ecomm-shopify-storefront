import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import AddressFormModal from "./AddressFormModal";
import AddAddressModal from "./AddAddressModal";
import DeleteAddressModal from "./DeleteAddressModal";
import { useDispatch } from "react-redux";

const CustomerAddresses = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((x) => x.customer);
  const selectedAddress = useSelector((x) => x.selectedAddress) || null;
  const [defaultAddress, setDefaultAddress] = useState(customer.defaultAddress);

  const wrapperRef = useRef(null);
  const [isActive, setIsActive] = useState([].fill(false));
  const [popUp, setPopUp] = useState({
    update: false,
    add: false,
    delete: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeSelection = (i, address) => {
    setIsActive((prevState) => ({
      [i]: !prevState[i],
    }));
    if (!isActive[i]) {
      dispatch({ type: "SET_SELECTED_ADDRESS", payload: address });
    } else {
      dispatch({ type: "DELETE_SELECTION", payload: null });
    }
  };
  const changeDefaultAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const addressId = selectedAddress.id;
    try {
      const { data } = await Axios.post(
        `http://localhost:3000/api/address/update-default`,
        { addressId }
      );
      if (data.customer) {
        dispatch({ type: "UPDATE_DEFAULT_ADDRESS", payload: selectedAddress})
        dispatch({ type: "DELETE_SELECTION", payload: null })
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
}


  return (
    <>
      {customer.addresses.length === 0 ? (
        <header className="pref-container">
          <h3
            style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}
          >
            Δεν έχετε ορίσει κάποια διεύθυνση
          </h3>
          <button
            className="update-address-btn"
            onClick={(e) => {
              e.preventDefault();
              setPopUp((prevState) => ({
                ...prevState,
                add: !popUp.add,
              }));
            }}
          >
            ΠΡΟΣΘΗΚΗ ΔΙΕΥΘΥΝΣΗΣ
          </button>
          <AddAddressModal trigger={popUp.add} setPopUp={setPopUp} />
        </header>
      ) : (
        <>
          <header className="pref-container">
            <h3
              style={{ 
                opacity: "0.7", 
                fontWeight: "100", 
                textAlign: "center",  
               }}
            >
              Οι διευθύνσεις μου
            </h3>
          </header>
          <article style={{ alignItems: "center" }}>
            <section className="address-header">
              {isActive && selectedAddress ? (
                <>
                  <button
                    className="delete-address-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPopUp((prevState) => ({
                        ...prevState,
                        delete: !popUp.delete,
                      }));
                    }}
                  >
                   <i className="fa-solid fa-trash"></i>
                    <span>ΔΙΑΓΡΑΦΗ</span>
                  </button>
                  <DeleteAddressModal
                    trigger={popUp.delete}
                    setPopUp={setPopUp}
                    defaultAddress={defaultAddress}
                  />
                  {selectedAddress.id != customer.defaultAddress.id ?
                    <button
                    className="edit-address-btn"
                    onClick={changeDefaultAddress}>
                      ΟΡΙΣΜΟΣ ΠΡ.
                    </button>
                  : ""}
                  <button
                    className="edit-address-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPopUp((prevState) => ({
                        ...prevState,
                        update: !popUp.update,
                      }));
                    }}
                  >
                    <i className="fas fa-pen"></i>
                    <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
                  </button>
                  <AddressFormModal
                    trigger={popUp.update}
                    setPopUp={setPopUp}
                  />
                </>
              ) : (
                ""
              )}
            </section>
            <article 
            style={{
              border: isActive[0] ? "1.5px solid #510ece" : "", marginTop: "25px",
              boxShadow: isActive[0] ? "0 0px 0px 0 rgba(208, 208, 208, 0.319), 0 5px 30px 0 rgba(0, 0, 0, 0.19)" : ""
            }}
            className="address-container"
            onClick={() => {
              setIsActive((prevState) => ({
                [0]: !prevState[0],
              }));
              if (!isActive[0]) {
                dispatch({ type: "SET_SELECTED_ADDRESS", payload: customer.defaultAddress });
              } else {
                dispatch({ type: "DELETE_SELECTION", payload: null });
              }
            }}>
               <h4
              style={{ opacity: "0.7", fontWeight: "100", textAlign: "center", padding: "5px 0px" }}
            >
              Προεπιλεγμένη διεύθυνση
            </h4>
              <section className="address-info">
                <span>
                  {customer.defaultAddress.address1},&nbsp;{customer.defaultAddress.zip}
                </span>
                <span>
                  {customer.defaultAddress.firstName}&nbsp;{customer.defaultAddress.lastName}
                </span>
              </section>
              <section className="address-info">
                <span>
                  {customer.defaultAddress.city},&nbsp;{customer.defaultAddress.country}
                </span>
                <span>{customer.defaultAddress.phone}</span>
              </section>
            </article>
            {customer?.addresses.map((address, i) => {
              return address.id === defaultAddress.id ? "" :
              <article
                key={i+1}
                className="address-container"
                style={{
                  borderColor:
                    isActive[`${i + 1}`] && selectedAddress ? "#510ece" : "",
                    boxShadow: isActive[`${i + 1}`] ? "0 0px 0px 0 rgba(208, 208, 208, 0.319), 0 5px 30px 0 rgba(0, 0, 0, 0.19)" : ""
                }}
                onClick={() => {
                  changeSelection(i+1, address);
                }}
              >
                <section className="address-info">
                  <span>
                    {address.address1},&nbsp;{address.zip}
                  </span>
                  <span>
                    {address.firstName}&nbsp;{address.lastName}
                  </span>
                </section>
                <section className="address-info">
                  <span>
                    {address.city},&nbsp;{address.country}
                  </span>
                  <span>{address.phone}</span>
                </section>
              </article>
            })}
            {!isLoading ? 
            <>
             <button
             className="update-address-btn"
             onClick={(e) => {
               e.preventDefault();
               setPopUp((prevState) => ({
                 ...prevState,
                 add: !popUp.add,
               }));
             }}
            >
              ΠΡΟΣΘΗΚΗ ΔΙΕΥΘΥΝΣΗΣ
            </button>
            <AddAddressModal trigger={popUp.add} setPopUp={setPopUp} />
           </>
           : 
           <div className="spinner">
           <div className="loadingio-spinner-ripple-hb4ksrtc1us">
             <div className="ldio-uua8zfoilp">
               <div></div>
               <div></div>
             </div>
           </div>
         </div>
         }
          </article>
        </>
      )}
    </>
  );
};

export default CustomerAddresses;
