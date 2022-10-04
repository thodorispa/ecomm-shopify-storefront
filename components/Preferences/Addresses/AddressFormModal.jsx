import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from 'axios';
import AddressForm from '../../AddressForm'
import validator from "validator";

const AddressFormModal = (props) => {
  const dispatch = useDispatch();
  const { selectedAddress } = useSelector(x => x);
  const [address, setAddress] = useState(selectedAddress);
  
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [message, setMessage] = useState("");


  const handleFormData = (input) => (e) => {
    let value = "";
    if (input === "phone" || input === "country") {
      value = e;
    } else {
      value = e.target.value;
    }

    setAddress((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };


  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(address));
    setIsSubmit(true);  
  };

  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setIsLoading(true);
      try {
        const { data } = await Axios.post(
          `http://localhost:3000/api/address/update`,
          {
            id: address.id,
            firstName: address.firstName,
            lastName: address.lastName,
            address1: address.address1,
            city: address.city,
            country: address.country,
            zip: address.zip,
            phone: address.phone,
          }
        );

        if (data.customerAddress) {
          dispatch({ type: "UPDATE_SELECTED_ADDRESS", payload: address })
          setIsLoading(false);
          setMessage("Επιτυχές ενημέρωση")
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setMessage("Κάτι πήγε λάθος")
      }
    }
  }, [errors]);

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      error.firstName = "First Name is required";
    }
    if (!values.lastName) {
      error.lastName = "Last Name is required";
    }
    if (!values.address1) {
      error.address = "Street Address is required";
    }

    if (!values.city) {
      error.city = "City or Town is required";
    }

    if (!values.country) {
      error.country = "Country is required";
    }
    if (!values.zip) {
      error.zip = "Zip Code is required";
    }
    if (!values.phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(values.phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    return error;
  };

  return props.trigger ? (
    <>
      <header className="popup">
        <article className="popup-inner">
          <section>
            <h1 style={{ fontSize: "25px" }}>Επεξεργασία στοιχείων διεύθυνσης</h1>
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
            handleFormData={handleFormData}
            address={address}
            // country={country}
            // handleCountry={countryOnChange}
            // phone={phone}
            // setPhone={setPhone}
            errors={errors} />
          <section
            style={{
              justifyContent: "space-evenly",
              alignSelf: "center",
              minWidth: "400px",
            }}
          >
            {!isLoading ? (
              <article>
                <section style={{ minWidth: "250px" }}>
                  <button className="cancel-update-btn" onClick={() => props.setPopUp(false)}>
                    ΑΚΥΡΩΣΗ
                  </button>
                  {props.children}
                  <button className="update-address-btn" onClick={submitFormData}>
                    ΕΝΗΜΕΡΩΣΗ
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
export default AddressFormModal;
