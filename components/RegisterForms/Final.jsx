import React from "react";
import Axios from "axios";


const Final = ({ values, address }) => {
  console.log("address", address);
  console.log("valeus", values);

  const handleRegister = async () => {
  
    try {
      const { data } = await Axios.post(`/api/customer/sign-up`, { values, address }); 

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
              <strong className="overview-strong">{values.phone}</strong>
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
                {address.address1}
              </strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">City:&nbsp;</label>
              <strong className="overview-strong">{address.city}</strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Country:&nbsp;</label>
              <strong className="overview-strong">
                {address.country}
              </strong>
            </section>
            <section className="overview-container">
              <label className="forms-label">Zip Code:&nbsp;</label>
              <strong className="overview-strong">{address.zip}</strong>
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
