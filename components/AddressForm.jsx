import React, { useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const AddressForm = ({ handleFormData, address, errors }) => {
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
                  value={address.firstName}
                  className="forms-input"
                  onChange={handleFormData("firstName")}
                />
                <label className={address.firstName ? "filled" : ""}>First Name</label>
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
                  value={address.lastName}
                  className="forms-input"
                  onChange={handleFormData("lastName")}
                />
                <label className={address.lastName ? "filled" : ""}>Last Name</label>
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
                  value={address.address1}
                  className="forms-input"
                  onChange={handleFormData("address1")}
                />
                <label className={address.address1 ? "filled" : ""}>Street Address</label>
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
                  value={address.city}
                  className="forms-input"
                  onChange={handleFormData("city")}
                />
                <label className={address.city ? "filled" : ""}>Town/City</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i className={errors.city ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.city}</small>
              </section>
            </article>
            <article>
              <div className="input-container">
                <Select
                  placeholder={(!address.country) ? 'Country' : address.country}
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
                      neutral50: address.country ? "#111b0d" : "rgb(87, 96, 78)",
                      neutral60: "#111b0d",
                      neutral70: "rgb(254, 255, 251)",
                      neutral80: "#111b0d",
                      neutral90: "#A19E84",
                    },
                  })}
                  options={options}
                  value={address.country}
                  onChange={(e) => {handleFormData("country")(e.label)
                console.log(e);}}
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
                  value={address.zip}
                  className="forms-input"
                  onChange={handleFormData("zip")}
                />
                <label className={address.zip ? "filled" : ""}>Zip Code</label>
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
                  value={address.phone}
                  className="forms-input"
                  onChange={(value) => handleFormData("phone")(value)}
                />
                {!address.phone ? (
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