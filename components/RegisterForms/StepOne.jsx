import React, { useState, useEffect } from "react";
import validator from "validator";
import Axios from "axios";
import Head from 'next/head';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const StepOne = ({ nextStep, handleFormData, values, phone, setPhone }) => {

  const [matchPass, setMatchPass] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      nextStep();
    }
  },[errors])

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

    if (!values.password) {
      error.password = "Password is required";
    } else if (matchPass != values.password) {
      error.password = "Passwords do not match";
    } else if (values.password.length < 4) {
      error.password = "Password must be at least 5 characters!";
    } 
    if (!phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    return error;
  };

  return (
    <header>
       <Head>
        <title>Register || Katoi</title>
      </Head>
      
      <article >
        <h1 style={{ margin: "0" }}>Register to Katoi</h1>
        <p className="register-desc">
          Complete the fields below to create an account to katoi soap, in order
          to manage your orders more efficiently.
        </p>
      </article>
      <section className="form-container">
        <article style={{alignItems: "center"}}>
          <form onSubmit={submitFormData} className="forms">
          <h3 style={{opacity: "0.7", fontWeight: "100", textAlign: "center"}}>Personal Information</h3>
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
              <section className="validate">
                <i className={errors.name ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.name}</small>
              </section>
            </article>
            <article>
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
              <section className="validate">
                <i className={errors.surname ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.surname}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="text"
                name="email"
                defaultValue={values.email}
                className="forms-input"
                onChange={handleFormData("email")}
              />
              <label className={values.email ? "filled" : ""}>Email</label>
              </div>
              <section className="validate">
                <i className={errors.email ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.email}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
            <PhoneInput
              placeholder="Mobile phone"
              value={phone}
              className="forms-input"
              onChange={setPhone}/>
              {!phone ? <></> : <label styles={{border: "none"}}className="filled">Mobile Phone</label>}
              </div>
              <section className="validate">
                <i className={errors.phone ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.phone}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="password"
                name="password"
                defaultValue={values.password}
                className="forms-input"
                onChange={handleFormData("password")}
              />
              <label className={values.password ? "filled" : ""}>Password</label>
              </div>
              <section className="validate">
                <i className={errors.password ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.password}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="password"
                name="name"
                className="forms-input"
                value={matchPass}
                onChange={(e) => setMatchPass(e.target.value)}
              />
              <label className={matchPass ? "filled" : ""}>Confirm Password</label>
              </div>
              <section className="validate">
                <i className={errors.password ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.password}</small>
              </section>
            </article>
            <article style={{alignItems: "center"}}>
            <button 
              className="register-btn"
              type="submit"
              >CONTINUE</button>
            </article>
         
          </form>
        </article>
      </section>
      
    </header>
  )

}
export default StepOne;