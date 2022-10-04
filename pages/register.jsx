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
    phone: "",
    password: "",
  })

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    country: "",
    city: "",
    zip: "",
    phone: "",
  })
  console.log("formData", address);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };
  
  const handleFormData = (input) => (e) => {
    let value = "";
    if (input === "phone" || input === "country") {
      value = e;
    } else {
      value = e.target.value;
    }

    if (step === 1) {
      setFormData((prevState) => ({
        ...prevState,
        [input]: value,
      }));
    } else {
      setAddress((prevState) => ({
        ...prevState,
        [input]: value,
      }));
    }
  };

  switch (step) {
    case 1:
      return (
        <header className="register">
          <StepOne nextStep={nextStep} handleFormData={handleFormData} values={formData} />
        </header>
      );
    case 2:
      return (
        <header className="register">
        <StepTwo 
          nextStep={nextStep} 
          prevStep={prevStep} 
          handleFormData={handleFormData} 
          address={address} />
      </header>
      );
    case 3:
      return (
        <header className="register">
           <Final values={formData} address={address} />
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
