import React, { useState, useEffect, useMemo } from 'react';
import validator from "validator";
import AddressForm from '../AddressForm'
import { handleAddressData, validate} from '../../helpers/FormHelper';

const StepTwo = ({ nextStep, prevStep, address, setAddress }) => {

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

  return (
    <header>
      <article >
        <h1 style={{ margin: "0" }}>Shipping Information</h1>
        
      </article>
      <section className="form-container">
        <article>
          <AddressForm
            address={address}
            setAddress={setAddress}
            handleAddressData={handleAddressData}
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