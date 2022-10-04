import React from "react";
import Axios from "axios";


const Final = ({ values, addressValues, country, phone }) => {

  const handleRegister = async () => {
    console.log(values);
    console.log(addressValues);
    console.log(country);
    console.log(phone);
    
    try {

      const { data } = await Axios.post(`http://localhost:3000/api/customer/sign-up`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: phone,
        address1: addressValues.address1,
        city: addressValues.city,
        country: country,
        zip: addressValues.zip,
      });

      if (data.customer) {
        dispatch({ type: "SET_USER", payload: data.customer })
        router.push(router.query.redirect || '/')
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <header className="overview-header">
        <h1>Your Account Info</h1>
      </header>
      <article style={{ justifyContent: "center" }}>
        <section className="overview-user-data">
          <article className="personal-info-overview">
            <h3
              style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}
            >
              Personal Information
            </h3>
            <section className="overview-container">
              <label className="forms-label">First Name:&nbsp;</label>
              <strong className="overview-strong">{values.firstName}</strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Last Name:&nbsp;</label>
              <strong className="overview-strong">{values.lastName}</strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Email:&nbsp;</label>
              <strong className="overview-strong">{values.email}</strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Phone:&nbsp;</label>
              <strong className="overview-strong">{phone}</strong>
            </section>
          </article>
          <article className="billing-info-overview">
            <h3
              style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}
            >
              Billing Information
            </h3>
            <section className="overview-container">
              <label className="forms-label">Home Address:&nbsp;</label>
              <strong className="overview-strong">
                {addressValues.address1}
              </strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">City:&nbsp;</label>
              <strong className="overview-strong">{addressValues.city}</strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Country:&nbsp;</label>
              <strong className="overview-strong">
                {country.label}
              </strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Zip Code:&nbsp;</label>
              <strong className="overview-strong">{addressValues.zip}</strong>
            </section>
          </article>
        </section>
        <section className="overview-buttons">
          <button
            style={{ width: "50%", marginRight: "10px" }}
            className="start-over-btn"
            onClick={() => window.location.reload(false)}>
            START OVER</button>
          <button
            style={{ width: "50%", marginLeft: "10px" }}
            className="register-btn"
            onClick={handleRegister}>
            REGISTER</button>
        </section>
      </article>
    </>
  );
};

export default Final;
