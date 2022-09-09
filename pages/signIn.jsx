import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Axios from 'axios';

const SignIn = () => {

  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();


  const validateForm = () => {
    return !invalidEmail(email) && password.length > 0;
  }

  const invalidEmail = str => {
    var error = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // allow only email format.

    if (str == "") {
      error = "Email is required";
    } else if (!regex.test(str)) {
      error = "Please enter a valid email format.";
    }

    return error;
  }

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post("/api/customer/login", { email, password });

      if (data.customer) {
        router.push(router.query.redirect || '/')
      }

    } catch (err) {
      setErrors(err.response.data);
    }
  }

  return (
    <div className="register">

      <header>
        <h1>Sign In</h1>
        <p 
        style={{
          marginTop: "5px",
          fontSize: "larger"
        }}>Welcome back, enter your credentials to sign in.</p>
      </header>

      <section>

        <div className="forms" style={{ alignItems: "flex-start", textAlign: "start" }}>
          <label style={{ textAlign: "start" }} className="forms-label">Email</label>
          <input type="text"
            name="email"
            className="forms-input"
            onChange={e => setEmail(e.target.value)} />
        </div>

        <form onSubmit={loginHandler} className="forms">

          <label className="forms-label">Password</label>
          <input type="password"
            name="password"
            className="forms-input"
            onChange={e => setPassword(e.target.value)} />
          <small>{errors}</small>

          <button
            className='register-btn'
            type="submit"
            disabled={!validateForm()}
          >
            Log in
          </button>

        </form>
      </section>
    </div>
  );
}

export default SignIn;