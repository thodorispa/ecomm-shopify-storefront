import React, {useState} from 'react';
import StepOne from '../components/RegisterForms/StepOne';
import StepTwo from '../components/RegisterForms/StepTwo';
import Final from '../components/RegisterForms/Final';

const CreateAccount = () => {

  const [step, setstep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    zip: "",
  })

  console.log(addressData);

  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState();
  const [addressPhone, setAddressPhone] = useState();

  const changeCountryHandler = country => {
    setCountry(country);
  }

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };
  
  const handleInputData = input => e => {
    const { value } = e?.target;

    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }
  const handleBillingData = input => e => {
    const { value } = e.target;

    setAddressData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }
  switch (step) {
    case 1:
      return (
        <header className="register">
          <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} phone={phone} setPhone={setPhone} />
        </header>
      );
    case 2:
      return (
        <header className="register">
        <StepTwo 
          nextStep={nextStep} 
          prevStep={prevStep} 
          handleFormData={handleBillingData} 
          handleCountry={changeCountryHandler} 
          country={country} 
          values={addressData}
          phone={addressPhone}
          setPhone={setAddressPhone} />
      </header>
      );
    case 3:
      return (
        <header className="register">
           <Final values={formData} addressValues={addressData} country={country} phone={phone} addressPhone={addressPhone} />
        </header>
      );
    // default case to show nothing
    default:
      return (
        <div className="container">
        </div>
      );
}
}
export default CreateAccount;
