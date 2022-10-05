import React, { useState } from "react";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Security = () => {
  const { customer } = useSelector((x) => x.customer);
  const [disabled, setDisabled] = useState({
    input: true,
    button: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [phone, setPhone] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleFormData = (input) => (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const buttonOnClick = (e) => {
    e.preventDefault();
    setDisabled((prevState) => ({
      ...prevState,
      input: !disabled.input,
    }));

    if (!disabled.input) {
      setDisabled((prevState) => ({
        ...prevState,
        input: true,
        button: true,
      }));
    }
  };

  return (
    <>
      <header className="pref-container"></header>
      <article>
        <section className="form-container">
          <article style={{ alignItems: "center" }}>
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
                  className={
                    disabled.input && !disabled.button
                      ? "edit-btn"
                      : "update-btn"
                  }
                  onClick={buttonOnClick}
                  disabled={disabled.button}
                >
                  {disabled.input && !disabled.button ? (
                    <>
                      <i className="fas fa-pen"></i>
                      <span>ΕΠΕΞΕΡΓΑΣΙΑ</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-check"></i>
                      <span>ΕΝΗΜΕΡΩΣΗ</span>
                    </>
                  )}
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
                    onChange={handleFormData("firstName")}
                  />
                  <label className="filled">First Name</label>
                </div>
                <section className="validate">
                  {/* <i className={errors.name ? "fa-solid fa-exclamation" : ""}></i> */}
                  {/* <small style={{ paddingLeft: "5px" }}>{errors.name}</small> */}
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
                    onChange={handleFormData("firstName")}
                  />
                  <label className={customer?.lastName ? "filled" : ""}>
                    Last Name
                  </label>
                </div>
                <section className="validate">
                  {/* <i className={errors.surname ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.surname}</small> */}
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
                    onChange={handleFormData("email")}
                  />
                  <label className="filled">Email</label>
                </div>
                <section className="validate">
                  {/* <i className={errors.email ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.email}</small> */}
                </section>
              </article>
              <section>
                <div className="input-container">
                  <PhoneInput
                    placeholder="Mobile phone"
                    value={customer?.phone}
                    className="pref-input"
                    disabled={disabled.input}
                    onChange={setPhone}
                  />
                  {!customer?.phone ? (
                    <></>
                  ) : (
                    <label styles={{ border: "none" }} className="filled">
                      Mobile Phone
                    </label>
                  )}
                </div>
                <section className="validate">
                  {/* <i className={errors.phone ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.phone}</small> */}
                </section>
              </section>
              <article style={{ alignItems: "center" }}></article>
            </form>
          </article>
        </section>
      </article>
    </>
  );
};

export default Security;
