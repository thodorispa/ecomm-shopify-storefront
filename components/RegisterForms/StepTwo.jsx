import React, {useState, useEffect, useMemo} from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const StepTwo = ({ nextStep, handleFormData, prevStep, values, handleCountry, country }) => {

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

    return error;
  };
  return ( 
    <header>
      <section className="form-container">
        <article>
          <form className="forms">
            <h3
              style={{ opacity: "0.7", fontWeight: "100", textAlign: "center" }}
            >
              Billing Information
            </h3>
            <article>
              <div className="input-container">
                <input
                  type="text"
                  name="firstName"
                  defaultValue={addressData.firstName}
                  className="forms-input"
                  onChange={addressDataOnChange("firstName")}
                />
                <label className="filled">First Name</label>
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
                  defaultValue={addressData.lastName}
                  className="forms-input"
                  onChange={addressDataOnChange("lastName")}
                />
                <label className="filled">Last Name</label>
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
                  defaultValue={addressData.address1}
                  className="forms-input"
                  onChange={addressDataOnChange("address1")}
                />
                <label className="filled">Street Address</label>
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
                  defaultValue={addressData.city}
                  className="forms-input"
                  onChange={addressDataOnChange("city")}
                />
                <label className="filled">Town/City</label>
              </div>
              <section className="validate" style={{ paddingLeft: "20px" }}>
                <i className={errors.city ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.city}</small>
              </section>
            </article>
            <article>
              <div className="input-container">
                <Select
                  placeholder={props.address.country}
                  className="country-input"
                  input={props.address.country}
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
                      neutral50: "#111b0d",
                      neutral60: "#111b0d",
                      neutral70: "rgb(254, 255, 251)",
                      neutral80: "#111b0d",
                      neutral90: "#A19E84",
                    },
                  })}
                  options={options}
                  defaultValue={props.address.country}
                  onChange={countryOnChange}
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
                  defaultValue={addressData.zip}
                  className="forms-input"
                  onChange={addressDataOnChange("zip")}
                />
                <label className="filled">Zip Code</label>
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
                  value={phone}
                  className="forms-input"
                  onChange={setPhone}
                />
                {!phone ? (
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
              <section>
              <button 
              className="register-btn"
              type="submit"
              style={{width: "40%", margin: "10px"}}
              >CONTINUE</button>
               <button 
              className="start-over-btn"
              type="submit"
              style={{width: "40%", margin: "10px"}}
              onClick={prevStep}
              >GO BACK</button>
              </section>
            </section>
            </article>
          </form>
        </article>
      </section>
    </header>
   );
}
 
export default StepTwo;