import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Security = () => {

  const { customer } = useSelector (x => x.customer);
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
  })

  const handleFormData = input => e => {
    const { value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [input]: value,
    }))
  }

  const buttonOnClick = (e) => {
    e.preventDefault();
    setDisabled(prevState => ({
      ...prevState,
      input: !disabled.input
    }));

    if (!disabled.input) {
      setDisabled(prevState => ({
        ...prevState,
        input: true,
        button: true,
      }))
    }

  }
  
  console.log(disabled);

  return ( 
    <>
    <header className="pref-container">
    </header>
    <article>
    <section className="form-container">
        <article style={{alignItems: "center"}}>
          <form className="forms">
          <h3 style={{opacity: "0.7", fontWeight: "100", textAlign: "center"}}>Personal Information</h3>
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
              <label className={customer?.lastName ? "filled" : ""}>Last Name</label>
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
              {!customer?.phone ? <></> : <label styles={{border: "none"}}className="filled">Mobile Phone</label>}
              </div>
              <section className="validate">
                {/* <i className={errors.phone ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.phone}</small> */}
              </section>
            </section>
            {/* <article> */}
            {/* <div className="input-container">
              <input
                type="password"
                name="password"
                defaultValue={customer?.password}
                className="pref-input"
                // onChange={handleFormData("password")}
              />
              <label className={customer?.password ? "filled" : ""}>Password</label>
              </div>
              <section className="validate">
                <i className={errors.password ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.password}</small>
              </section>
            </article> */}
            {/* <article>
            <div className="input-container">
              <input
                type="password"
                name="name"
                className="pref-input"
                value={matchPass}
                onChange={(e) => setMatchPass(e.target.value)}
              />
              <label className={matchPass ? "filled" : ""}>Confirm Password</label>
              </div>
              <section className="validate">
                <i className={errors.password ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.password}</small>
              </section>
            </article> */}
            <article style={{alignItems: "center"}}>
            <button 
              className="register-btn"
              onClick={buttonOnClick}
              disabled={disabled.button}
              >{disabled.input && !disabled.button ? <span>ΕΠΕΞΕΡΓΑΣΙΑ</span> : <span>ΕΝΗΜΕΡΩΣΗ</span>}</button>
            </article>
            
         
          </form>
        </article>
      </section>
    </article>
    
    </> 
   );
}
 
export default Security;