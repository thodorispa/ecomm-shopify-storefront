import React, { useState, useEffect, useMemo } from 'react';
import validator from "validator";
import AddressForm from '../AddressForm'

const StepTwo = ({ nextStep, handleFormData, prevStep, address }) => {

  window.scrollTo(0, 0)

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(address));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      nextStep();
    }
  }, [errors])

  const validate = (values) => {
    const error = {};

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

    if (!values.country) {
      error.country = "Country is required";
    }
    if (!values.zip) {
      error.zip = "Zip Code is required";
    }
    if (!values.phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(values.phone)) {
      error.phone = "This is not a valid mobile phone format";
    }

    return error;
  };
  return (
    <header>
      <article >
        <h1 style={{ margin: "0" }}>Shipping Information</h1>
        
      </article>
      <section className="form-container">
        <article>
          <AddressForm
            address={address}
            handleFormData={handleFormData}
            errors={errors} />
          <section>
            <button
              className="start-over-btn"
              type="submit"
              style={{ width: "40%", margin: "10px" }}
              onClick={prevStep}
            >GO BACK</button>
            <button
              className="register-btn"
              type="submit"
              style={{ width: "40%", margin: "10px" }}
              onClick={submitFormData}
            >CONTINUE</button>
          </section>
        </article>
      </section>
    </header>
  );
}

export default StepTwo;