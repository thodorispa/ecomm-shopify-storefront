import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import Select from "react-select";
import countryList from "react-select-country-list";
import validator from "validator";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const AddressForm = (props) => {
  const options = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState(props.address.country);
  const [phone, setPhone] = useState(props.address.phone);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

        if (data.customer) {
          dispatch({ type: "SET_USER", payload: data.customer });
          router.push(router.query.redirect || "/");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
          <h1>Επεξεργασία στοιχείων διεύθυνσης</h1>
          <form className="forms">
            <h3
              style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}
            >
              Billing Information
            </h3>
            <article>
              <div className="input-container">
                <input
                  type="text"
                  name="firstName"
                  defaultValue={addressData.firstName}
                  className="forms-input"
                  onChange={addressDataOnChange("firstName")}
                />
                <label className="filled">First Name</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i
                  className={errors.firstName ? "fa-solid fa-exclamation" : ""}
                ></i>
                <small style={{ paddingLeft: "5px" }}>{errors.firstName}</small>
              </section>
              <div className="input-container">
                <input
                  type="text"
                  name="lastName"
                  defaultValue={addressData.lastName}
                  className="forms-input"
                  onChange={addressDataOnChange("lastName")}
                />
                <label className="filled">Last Name</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i
                  className={errors.lastName ? "fa-solid fa-exclamation" : ""}
                ></i>
                <small style={{ paddingLeft: "5px" }}>{errors.lastName}</small>
              </section>
              <div className="input-container">
                <input
                  type="text"
                  name="address1"
                  defaultValue={addressData.address1}
                  className="forms-input"
                  onChange={addressDataOnChange("address1")}
                />
                <label className="filled">Street Address</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i
                  className={errors.address ? "fa-solid fa-exclamation" : ""}
                ></i>
                <small style={{ paddingLeft: "5px" }}>{errors.address}</small>
              </section>
            </article>
            <article>
              <div className="input-container">
                <input
                  type="text"
                  name="city"
                  defaultValue={addressData.city}
                  className="forms-input"
                  onChange={addressDataOnChange("city")}
                />
                <label className="filled">Town/City</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i className={errors.city ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.city}</small>
              </section>
            </article>
            <article>
              <div className="input-container">
                <Select
                  placeholder={props.address.country}
                  className="country-input"
                  input={props.address.country}
                  styles={customStyles}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "7px",
                    padding: "15px",
                    colors: {
                      ...theme.colors,
                      primary25: "#d3d0ae",
                      primary50: "#d3d0ae",
                      primary: "#111b0d",
                      neutral10: "rgb(254, 255, 251)",
                      neutral20: "#111b0d",
                      neutral30: "#111b0d",
                      neutral40: "#111b0d",
                      neutral50: "#111b0d",
                      neutral60: "#111b0d",
                      neutral70: "rgb(254, 255, 251)",
                      neutral80: "#111b0d",
                      neutral90: "#A19E84",
                    },
                  })}
                  options={options}
                  defaultValue={props.address.country}
                  onChange={countryOnChange}
                />
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i
                  className={errors.country ? "fa-solid fa-exclamation" : ""}
                ></i>
                <small style={{ paddingLeft: "5px" }}>{errors.country}</small>
              </section>
            </article>
            <article>
              <div className="input-container">
                <input
                  type="text"
                  name="zip"
                  defaultValue={addressData.zip}
                  className="forms-input"
                  onChange={addressDataOnChange("zip")}
                />
                <label className="filled">Zip Code</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i className={errors.zip ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "10px" }}>{errors.zip}</small>
              </section>
            </article>
            <article>
              <div className="input-container">
                <PhoneInput
                  placeholder="Mobile phone"
                  value={phone}
                  className="forms-input"
                  onChange={setPhone}
                />
                {!phone ? (
                  <></>
                ) : (
                  <label styles={{ border: "none" }} className="filled">
                    Mobile Phone
                  </label>
                )}
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i className={errors.phone ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.phone}</small>
              </section>
            </article>
          </form>
          <section
            style={{
              justifyContent: "space-evenly",
              alignSelf: "center",
              minWidth: "400px",
            }}
          >
            {!isLoading ? (
              <>
                <button className="cancel-update-btn" onClick={cancelOnClick}>
                  ΑΚΥΡΩΣΗ
                </button>
                {props.children}
                <button className="update-address-btn" onClick={submitFormData}>
                  ΕΝΗΜΕΡΩΣΗ
                </button>
              </>
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
export default AddressForm;
