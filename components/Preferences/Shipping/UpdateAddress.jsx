import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import AddressForm from '../../AddressForm'
import Select from "react-select";
import countryList from "react-select-country-list";
import validator from "validator";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const UpdateAddress = (props) => {

  const options = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState(props.address.country);
  const [phone, setPhone] = useState(props.address.phone);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      padding: state.selectProps.padding,
      color: "#111b0d",
      maxWidth: "200px ",
    }),
    indicatorsContainer: () => ({
      padding: "7px",
    }),
  };
  const [addressData, setAddressData] = useState({
    id: props.address.id,
    firstName: props.address.firstName,
    lastName: props.address.lastName,
    address1: props.address.address1,
    city: props.address.city,
    zip: props.address.zip,
  });

  const addressDataOnChange = (input) => (e) => {
    const { value } = e.target;

    setAddressData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };
  const cancelOnClick = (e) => {
    e.preventDefault();
    props.setPopUp(false);
    setAddressData({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      address1: props.address.address1,
      city: props.address.city,
      zip: props.address.zip,
    });
    setCountry(props.address.country);
    setErrors({});
    setPhone(props.address.phone);
    setIsLoading(false);
    setMessage("");
    setIsSubmit(false);
  };

  const countryOnChange = (country) => {
    setCountry(country);
  };

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(addressData));
    setIsSubmit(true);
  };

  useEffect( async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setIsLoading(true);
      try {
        const { data } = await Axios.post(
          `http://localhost:3000/api/address/update`,
          {
            id: addressData.id,
            firstName: addressData.firstName,
            lastName: addressData.lastName,
            address1: addressData.address1,
            city: addressData.city,
            country: country,
            zip: addressData.zip,
            phone: phone,
          }
        );

        if (data.customerAddress) {
          console.log(data);
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

    if (!country) {
      error.country = "Country is required";
    }
    if (!values.zip) {
      error.zip = "Zip Code is required";
    }
    if (!phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    return error;
  };

  return props.trigger ? (
    <>
      <header className="popup">
        <article className="popup-inner">
          <section> 
            <h1 style={{fontSize: "25px"}}>Επεξεργασία στοιχείων διεύθυνσης</h1>
            <i style={{
              padding: "10px",
              fontSize: "25px",
              marginTop: "5px",
              color: "#aa4f5c",
              cursor: "pointer",
            }}
            className="fa-solid fa-xmark"
            onClick={cancelOnClick}>{props.children}</i>
          </section>
          <AddressForm 
            values={addressData} 
            handleFormData={addressDataOnChange} 
            country={country} 
            handleCountry={countryOnChange}
            phone={phone}
            setPhone={setPhone}
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
                <section style={{minWidth: "250px"}}>
                <button className="cancel-update-btn" onClick={cancelOnClick}>
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
export default UpdateAddress;
