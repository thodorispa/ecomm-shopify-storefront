import React, {useState, useEffect, useMemo} from 'react';
import validator from "validator";
import AddressForm from '../AddressForm'
import Select from 'react-select';
import countryList from 'react-select-country-list';

const StepTwo = ({ nextStep, handleFormData, prevStep, values, handleCountry, country, phone, setPhone }) => {

  window.scrollTo(0, 0)

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const options = useMemo(() => countryList().getData(), [])

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      padding: state.selectProps.padding,
      color: '#111b0d',
      maxWidth: "200px "
    }),
    indicatorsContainer: () => ({
      padding: '7px',
    }),
  }

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      nextStep();
    }
  },[errors])

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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

    if (!country) {
      error.country = "Country is required";
    }
    if (!values.zip) {
      error.zip = "Zip Code is required";
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
      <section className="form-container">
        <article>
        <AddressForm 
          values={values} 
          handleFormData={handleFormData} 
          country={country} 
          handleCountry={handleCountry} 
          phone={phone}
          setPhone={setPhone}
          errors={errors} />
          <section>  
              <button 
              className="start-over-btn"
              type="submit"
              style={{width: "40%", margin: "10px"}}
              onClick={prevStep}
              >GO BACK</button>
                <button 
              className="register-btn"
              type="submit"
              style={{width: "40%", margin: "10px"}}
              onClick={submitFormData}
              >CONTINUE</button>
              </section>
        </article>
      </section>
    </header>
   );
}
 
export default StepTwo;