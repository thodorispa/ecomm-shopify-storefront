import React, { useState, useMemo, useEffect } from "react";
import Axios from 'axios';
import AddressForm from '../../AddressForm'
import validator from "validator";
import { handleAddressData, validate} from '../../../helpers/FormHelper';

const AddAddressModal = (props) => {

  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    country: "",
    city: "",
    zip: "",
    phone: "",
  })

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [message, setMessage] = useState("");

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(address));
    setIsSubmit(true);  
  };
  const cancelOnClick = () => {
    console.log('here');
    props.setPopUp((prevState) => ({
      ...prevState,
      add: false,
    }));
    setAddress({
      firstName: "",
      lastName: "",
      address1: "",
      country: "",
      city: "",
      zip: "",
      phone: "",
    });
    setMessage("");
  }

  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setIsLoading(true);
      try {
        const { data } = await Axios.post(
          `http://localhost:3000/api/address/create`, {address}
        );

        if (data.customerAddress) {
          setIsLoading(false);
          props.setPopUp(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setMessage("Κάτι πήγε λάθος")
      }
    }
  }, [errors]);

  return props.trigger ? (
    <>
      <header className="popup">
        <article className="popup-inner">
          <section>
            <h1 style={{ fontSize: "25px" }}>Προσθήκη νέας διεύθυνσης</h1>
            <i style={{
              padding: "10px",
              fontSize: "25px",
              marginTop: "5px",
              color: "#aa4f5c",
              cursor: "pointer",
            }}
              className="fa-solid fa-xmark"
              onClick={() => props.setPopUp(false)}>
              {props.children}
            </i>
          </section>
          <AddressForm
            handleAddressData={handleAddressData}
            address={address}
            setAddress={setAddress}
            errors={errors} />
          <section
            style={{
              justifyContent: "space-evenly",
              alignSelf: "center",
              minWidth: "380px",
              marginRight: "20px"
            }}
          >
            {!isLoading ? (
              <article>
                <section className="address-form-btns">
                  <button className="cancel-update-btn" onClick={cancelOnClick}>
                    ΑΚΥΡΩΣΗ
                  </button>
                  {props.children}
                  <button className="update-address-btn" onClick={submitFormData}>
                    ΠΡΟΣΘΗΚΗ
                  </button>
                </section>
                {message ? <h4>{message}</h4> : ""}
              </article>
            ) : (
              <div className="spinner">
                <div className="loadingio-spinner-ripple-hb4ksrtc1us">
                  <div className="ldio-uua8zfoilp">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </article>
      </header>
    </>
  ) : (
    ""
  );
};
export default AddAddressModal;
