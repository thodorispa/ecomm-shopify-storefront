import React, {useState, useEffect} from 'react';
import validator from 'validator';
import Axios from 'axios';

const Register = () => {

  const [matchPass, setMatchPass] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const initialValues = { name: "", surname: "", email: "", password: "", phone: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const registerUser = (e) => {
    e.preventDefault();
    setErrors(validate(formValues));
    setIsSubmit(true);
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      Axios.post(`http://localhost:3000/api/customer/sign-up`, {
            email: formValues.email,
            firstName: formValues.name,
            lastName: formValues.surname,
            password: formValues.password,
            phone: formValues.phone,
      })
      .then((res) => {
        console.log("Success", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },[errors])

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
      error.password = "Password must be at least 5 characters!"
    } else if (values.password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters"
    }
    if (!values.phone) {
      error.phone = "Mobile Phone is required";
    } else if (!validator.isMobilePhone(values.phone)) {
      error.phone = "This is not a valid mobile phone format"
    }
    return error;
  }

  return ( 
    <div className="register">
    <header>
      <h1 style={{margin: "0"}}>Register to Katoi</h1>
      <p style={{marginTop: "5px", fontSize: "larger"}}>Complete the fields below to create an account to katoi soap, in order to manage your orders more efficiently.</p>
    </header>
    <section>
      <div className="field">
      <div action="" className="forms">
        <label className="forms-label">First Name</label>
        <label className="forms-label">Last Name</label>
        <label className="forms-label">Email</label>
        <label className="forms-label">Phone</label>
        <label className="forms-label">Password</label>
        <label className="forms-label">Confirm Password</label>
      </div>
      <form onSubmit={registerUser} className="forms">
        <input type="text" 
          name="name"
          className="forms-input"
          value={formValues.name}
          onChange={handleOnChange}
          placeholder="..."/>
        <input type="text"  
          name="surname"
          className="forms-input"
          value={formValues.surname}
          onChange={handleOnChange}
          placeholder="..."/>
        <input type="email"
          name="email"
          className="forms-input"
          value={formValues.email}
          onChange={handleOnChange}
          placeholder="..."/>
        <input type="text"
          name="phone"
          className="forms-input"
          value={formValues.phone}
          onChange={handleOnChange}
          placeholder="..."/>
        <input type="password"
          name="password"
          className="forms-input"
          value={formValues.password}
          onChange={handleOnChange}
          placeholder="..."/>
        <input type="password" name="name"
          className="forms-input"
          value={matchPass}
          onChange={(e) =>( setMatchPass(e.target.value))}
          placeholder="..."/>
          <input type="submit" 
          className="register-btn"
          value="Register"/>
      </form>
      <div className="validation">
      <i className={errors.name ? "fa-solid fa-exclamation" : ""}></i>
      <i className={errors.surname ? "fa-solid fa-exclamation" : ""}></i>
      <i className={errors.email ? "fa-solid fa-exclamation" : ""}></i>
      <i className={errors.phone ? "fa-solid fa-exclamation" : ""}></i>
      <i className={errors.password ? "fa-solid fa-exclamation" : ""}></i>
      <i className={errors.password ? "fa-solid fa-exclamation" : ""}></i>
      </div>
      <div className="validation">
      <small>{errors.name}</small>
      <small>{errors.surname}</small>
      <small>{errors.email}</small>
      <small>{errors.phone}</small>
      <small>{errors.password}</small>
      <small>{errors.password}</small>
      </div>
      </div>
    </section>
    </div>
   );
}
 
export default Register;