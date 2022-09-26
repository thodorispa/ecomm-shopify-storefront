import React, {useState, useEffect} from 'react';

const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {

  window.scrollTo(0, 0)

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

    if (!values.country) {
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
          <form onSubmit={submitFormData} className="forms">
          <h3 style={{opacity: "0.7", fontWeight: "100", textAlign: "center"}}>Billing Information</h3>
            <article>
              <div className="input-container">
              <input
                type="text"
                name="address1"
                defaultValue={values.address1}
                className="forms-input"
                onChange={handleFormData("address1")}
              />
              <label className={values.address1 ? "filled" : ""}>Street Address</label>
              </div>
              <section className="validate">
                <i className={errors.address ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.address}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="text"
                name="city"
                defaultValue={values.city}
                className="forms-input"
                onChange={handleFormData("city")}
              />
              <label className={values.city ? "filled" : ""}>Town/City</label>
              </div>
              <section className="validate">
                <i className={errors.city ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.city}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="text"
                name="country"
                defaultValue={values.country}
                className="forms-input"
                onChange={handleFormData("country")}
              />
              <label className={values.country ? "filled" : ""}>Country</label>
              </div>
              <section className="validate">
                <i className={errors.country ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.country}</small>
              </section>
            </article>
            <article>
            <div className="input-container">
              <input
                type="text"
                name="zip"
                defaultValue={values.zip}
                className="forms-input"
                onChange={handleFormData("zip")}
              />
              <label className={values.zip ? "filled" : ""}>Zip Code</label>
              </div>
              <section className="validate">
                <i className={errors.zip ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.zip}</small>
              </section>
            </article>
            <section style={{alignItems: "center"}}>
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
              >CONTINUE</button>
            </section>
          </form>
        </article>
      </section>
    </header>
   );
}
 
export default StepTwo;