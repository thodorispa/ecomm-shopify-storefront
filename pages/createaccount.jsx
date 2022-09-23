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
    phone: "",
  })

  const [addressData, setAddressData] = useState({
    address1: "",
    city: "",
    country: "",
    zip: "",
  })
  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  console.log(formData, addressData);
  
  const handleInputData = input => e => {
    const { value } = e.target;

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
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <header className="container register">
          <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
        </header>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <header className="container register">
        <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleBillingData} values={addressData} />
      </header>
      );
      // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <header className="container register">
           <Final values={formData} addressValues={addressData}  />
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
