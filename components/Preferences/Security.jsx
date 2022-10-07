import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import validator from "validator";
import PhoneInput from "react-phone-number-input";
import { handleFormData, validate } from '../../helpers/FormHelper'

const Security = () => {

  const { customer } = useSelector((x) => x.customer);
  const [disabled, setDisabled] = useState({
    input: true,
    edit: false,
    update: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email,
      phone: customer?.phone,
    })
  },[customer])

  const editOnClick = (e) => {
    e.preventDefault();
    setDisabled((prevState) => ({
      ...prevState,
      input: !disabled.input,
    }))
  };

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    setIsSubmit(true);
  }


  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      error.name = "First Name is required";
    }

    if (!values.lastName) {
      error.surname = "Last Name is required";
    }

    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format";
    }

    // if (!values.password) {
    //   error.password = "Password is required";
    // } else if (matchPass != values.password) {
    //   error.password = "Passwords do not match";
    // } else if (values.password.length < 4) {
    //   error.password = "Password must be at least 5 characters!";
    // }
    if (!values.phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(values.phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    return error;
  };

  useEffect (async() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setIsLoading(true)
        setDisabled((prevState) => ({
          ...prevState,
          input: true,
          edit: true,
        }));
        const targetCustomer = formData;
        console.log(targetCustomer);
        try {
          const { data } = await Axios.post(
            `/api/customer/update`,
            { targetCustomer }
          );
          if (data.customer) {
            setIsLoading(false);
            console.log("success");
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setMessage("Κάτι πήγε λάθος")
        }
    }
   
  },[errors])
  
  console.log(isLoading);

  return (
    <>
      <header className="pref-container">

      </header>
          <article 
          className="form-container"
          style={{ alignItems: "center" }}>
            <form className="address-form" style={{ justifyContent: "center" }}>
              <section
                style={{
                  justifyContent: "space-between",
                  padding: "0px 0px 0px 15px",
                }}
              >
                <h3
                  style={{
                    opacity: "0.7",
                    fontWeight: "100",
                    textAlign: "center",
                  }}
                >
                  Personal Information
                </h3>
                <button
                  className="edit-address-btn"
                  style={{width: "35%"}}
                  onClick={editOnClick}
                  disabled={disabled.edit}
                >
                    <i className="fas fa-pen"></i>
                    <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
                </button>
              </section>
              <article>
                <div className="input-container">
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={customer?.firstName}
                    className="pref-input"
                    disabled={disabled.input}
                    onChange={handleFormData("firstName",formData, setFormData)}
                  />
                  <label className="filled">First Name</label>
                </div>
                <section className="validate" style={{paddingLeft: "20px"}}>
                  <i className={errors.name ? "fa-solid fa-exclamation" : ""}></i> 
                  <small style={{ paddingLeft: "5px" }}>{errors.name}</small>
                </section>
              </article>
              <article>
                <div className="input-container">
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={customer?.lastName}
                    className="pref-input"
                    disabled={disabled.input}
                    onChange={handleFormData("lastName",formData, setFormData)}
                  />
                  <label className={customer?.lastName ? "filled" : ""}>
                    Last Name
                  </label>
                </div>
                <section className="validate" style={{paddingLeft: "20px"}}>
                  <i className={errors.surname ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.surname}</small>
                </section>
              </article>
              <article>
                <div className="input-container">
                  <input
                    type="text"
                    name="email"
                    defaultValue={customer?.email}
                    className="pref-input"
                    disabled={disabled.input}
                    onChange={handleFormData("email",formData, setFormData)}
                  />
                  <label className="filled">Email</label>
                </div>
                <section className="validate" style={{paddingLeft: "20px"}}>
                  <i className={errors.email ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.email}</small>
                </section>
              </article>
              <article>
                <div className="input-container">
                  <PhoneInput
                    placeholder="Mobile phone"
                    value={customer?.phone}
                    className="pref-input"
                    disabled={disabled.input}
                    onChange={(value) => handleFormData("phone",formData, setFormData)(value)}
                  />
                  {!customer?.phone ? (
                    <></>
                  ) : (
                    <label styles={{ border: "none" }} className="filled">
                      Mobile Phone
                    </label>
                  )}
                </div>
                <section className="validate" style={{paddingLeft: "20px", paddingBottom: "10px"}}>
                  <i className={errors.phone ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.phone}</small>
                </section>
              </article>
              <article style={{ alignItems: "center" }}></article>
            </form>
            {!disabled.input ? 
            <>
              {!isLoading ? 
              <article>
                <button className="update-address-btn" onClick={submitFormData}>
                ΕΝΗΜΕΡΩΣΗ
              </button>
              </article>
                : ""}
           </>
            : ""}
            {isLoading ? <div className="spinner">
                <div className="loadingio-spinner-ripple-hb4ksrtc1us">
                  <div className="ldio-uua8zfoilp">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div> : <span>{message}</span>}
          </article>
    </>
  );
};

export default Security;
