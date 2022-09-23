import React, { useState, useEffect } from "react";
import validator from "validator";
import Axios from "axios";
import Head from 'next/head';

const Register = () => {

  const [matchPass, setMatchPass] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    setErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      try {

        const { data } = await Axios.post(`http://localhost:3000/api/customer/sign-up`, {
          email: formValues.email,
          firstName: formValues.name,
          lastName: formValues.surname,
          password: formValues.password,
          phone: formValues.phone,
        })

        if (data.customer) {
          dispatch({ type: "SET_USER", payload: data.customer })
          router.push(router.query.redirect || '/')
        }

      } catch (error) {
        console.log(error);
      }

    }
  }, [errors]);

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      error.name = "First Name is required";
    }

    if (!values.surname) {
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
    if (!values.phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(values.phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    return error;
  };

  return (
    <header className="container register">
       <Head>
        <title>Register || Katoi</title>
      </Head>
      
      <article>
        <h1 style={{ margin: "0" }}>Register to Katoi</h1>
        <p className="register-desc">
          Complete the fields below to create an account to katoi soap, in order
          to manage your orders more efficiently.
        </p>
      </article>
      <section className="form-container">
        <article>
          <form onSubmit={registerUser} className="forms">
          <h4 style={{opacity: "0.7", fontWeight: "100", textAlign: "center"}}>Personal Information</h4>
            <article>
              <div className="input-container">
              <input
                type="text"
                name="name"
                className="forms-input"
                value={formValues.name}
                onChange={handleOnChange}
              />
              <label className={formValues.name ? "filled" : ""}>First Name</label>
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
                name="surname"
                className="forms-input"
                value={formValues.surname}
                onChange={handleOnChange}
              />
              <label className={formValues.surname ? "filled" : ""}>Last Name</label>
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
                className="forms-input"
                value={formValues.email}
                onChange={handleOnChange}
              />
              <label className={formValues.email ? "filled" : ""}>Email</label>
              </div>
              <section className="validate">
                <i className={errors.email ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.email}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="phone"
                name="phone"
                className="forms-input"
                value={formValues.phone}
                onChange={handleOnChange}
              />
              <label className={formValues.phone ? "filled" : ""}>Mobile Phone</label>
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
                className="forms-input"
                value={formValues.password}
                onChange={handleOnChange}
              />
              <label className={formValues.password ? "filled" : ""}>Password</label>
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
          </form>
        </article>
      </section>
      <button 
        className="register-btn"
        onClick={registerUser}
        style={{width: "100%"}}
        >REGISTER</button>
    </header>
  );
};

export default Register;
