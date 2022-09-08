import React, {useState} from 'react';
import Axios from 'axios';

const SignIn = () => {

  const initialValues = { email: "", password: ""};
  const [credentials, setCredentials] = useState(initialValues);
  const [flag, setFlag] = useState(true);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  }

  const loginHandler = (e) => {
    e.preventDefault();

    Axios.post(`http://localhost:3000/api/customer/login`, {
      email: credentials.email,
      password: credentials.password
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.status);
    })
  }

  return ( 
    <div className="register">
      <header>
        <h1>Sign In</h1>
        <p style={{marginTop: "5px", fontSize: "larger"}}>Welcome back, enter your credentials to sign in.</p>
     </header>
     <section>
      <div className="forms" style={{alignItems: "flex-start", textAlign: "start"}}>
        <label style={{ textAlign: "start"}}className="forms-label">Email</label>
        <input type="text" 
        name="email"
          className="forms-input"
          value={credentials.email}
          onChange={handleOnChange}/>
      </div>
      <form onSubmit={loginHandler} className="forms">
        <label className="forms-label">Password</label>
        <input type="password" 
          name="password"
          className="forms-input"
          value={credentials.password}
          onChange={handleOnChange}/>
        <input type="submit" className="register-btn" value="Sign In"/>
      </form>
      
     </section>
    </div>
    
   );
}
 
export default SignIn;