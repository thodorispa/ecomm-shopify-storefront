import React, {useState, useEffect, useMemo} from 'react';
import { useSelector } from "react-redux";
import Axios from 'axios';
import Select from "react-select";
import countryList from "react-select-country-list";
import validator from "validator";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const AddressForm = ({values, handleFormData, country, handleCountry, phone, setPhone, errors}) => {

  const options = useMemo(() => countryList().getData(), []);

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

  return ( 
    <header>
    <section className="form-container">
      <article>
        <form className="forms">
          <h3
            style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}
          >
          </h3>
          <article>
            <div className="input-container">
              <input
                type="text"
                name="firstName"
                defaultValue={values.firstName}
                className="forms-input"
                onChange={handleFormData("firstName")}
              />
              <label className={values.firstName ? "filled" : ""}>First Name</label>
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
                defaultValue={values.lastName}
                className="forms-input"
                onChange={handleFormData("lastName")}
              />
              <label className={values.lastName ? "filled" : ""}>Last Name</label>
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
                defaultValue={values.address1}
                className="forms-input"
                onChange={handleFormData("address1")}
              />
              <label className={values.address1 ? "filled" : ""}>Street Address</label>
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
                defaultValue={values.city}
                className="forms-input"
                onChange={handleFormData("city")}
              />
              <label className={values.city ? "filled" : ""}>Town/City</label>
            </div>
            <section className="validate" style={{ paddingLeft: "20px" }}>
              <i className={errors.city ? "fa-solid fa-exclamation" : ""}></i>
              <small style={{ paddingLeft: "5px" }}>{errors.city}</small>
            </section>
          </article>
          <article>
            <div className="input-container">
              <Select
                placeholder={(!country) ? 'Country' : country}
                className="country-input"
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
                    neutral50: {country} ? "#111b0d" : "rgb(87, 96, 78)",
                    neutral60: "#111b0d",
                    neutral70: "rgb(254, 255, 251)",
                    neutral80: "#111b0d",
                    neutral90: "#A19E84",
                  },
                })}
                options={options}
                defaultValue={country}
                onChange={handleCountry}
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
                defaultValue={values.zip}
                className="forms-input"
                onChange={handleFormData("zip")}
              />
              <label className={values.zip ? "filled" : ""}>Zip Code</label>
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
      </article>
    </section>
  </header>
   );
}
 
export default AddressForm;