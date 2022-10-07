import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from 'axios';
import AddressForm from '../../AddressForm'
import validator from "validator";
import { handleAddressData, validate} from '../../../helpers/FormHelper';

const AddressFormModal = (props) => {
  const dispatch = useDispatch();
  const { selectedAddress } = useSelector(x => x);
  const { customer } = useSelector(x => x);
  const [address, setAddress] = useState();
  
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAddress(selectedAddress)
  },[selectedAddress])

  const submitFormData = (e) => {
    e.preventDefault();
    setErrors(validate(address));
    setIsSubmit(true);  
  };

  const cancelOnClick = () => {
    props.setPopUp((prevState) => ({
      ...prevState,
      update: false,
    }));
    setAddress(selectedAddress);
    setMessage("");
  }

  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setIsLoading(true);
      try {
        const { data } = await Axios.post(
          `/api/address/update`,
          { address }
        );

        if (data.customerAddress) {
          dispatch({ type: "UPDATE_SELECTED_ADDRESS", payload: address })
          dispatch({ type: "DELETE_SELECTION", payload: null })
          setIsLoading(false);
          props.setPopUp((prevState) => ({
            ...prevState,
            update: false,
          }));
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setMessage("Κάτι πήγε λάθος")
      }
    }
  }, [errors]);

  return props.trigger ? (
    <>
      <header className="popup">
        <article className="popup-inner">
          <section>
            <h1 style={{ fontSize: "25px" }}>Επεξεργασία στοιχείων διεύθυνσης</h1>
            <i style={{
              padding: "10px",
              fontSize: "25px",
              marginTop: "5px",
              color: "#aa4f5c",
              cursor: "pointer",
            }}
              className="fa-solid fa-xmark"
              onClick={() => props.setPopUp((prevState) => ({
                ...prevState,
                update: false,
              }))}>
              {props.children}
            </i>
          </section>
          <AddressForm
            handleAddressData={handleAddressData}
            address={address}
            setAddress={setAddress}
            errors={errors} />
          <section
            style={{
              justifyContent: "space-evenly",
              alignSelf: "center",
              minWidth: "380px",
            }}
          >
            {!isLoading ? (
              <article>
                <section className="address-form-btns">
                  <button className="cancel-update-btn" onClick={cancelOnClick}>
                    ΑΚΥΡΩΣΗ
                  </button>
                  {props.children}
                  <button className="update-address-btn" onClick={submitFormData}>
                    ΕΝΗΜΕΡΩΣΗ
                  </button>
                </section>
                {message ? <h4>{message}</h4> : ""}
              </article>
            ) : (
              <div className="spinner">
                <div className="loadingio-spinner-ripple-hb4ksrtc1us">
                  <div className="ldio-uua8zfoilp">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </article>
      </header>
    </>
  ) : (
    ""
  );
};
export default AddressFormModal;
