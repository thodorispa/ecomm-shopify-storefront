import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const DeleteAddressModal = (props) => {

  const { selectedAddress } = useSelector(x => x);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const deleteOnClick = async (e) => {
    e.preventDefault();
    if (selectedAddress.id === props.defaultAddress.id) {
      props.setFlag(true);
    }
    setIsLoading(true);
      try {
        const { data } = await Axios.post(
          `http://localhost:3000/api/address/delete`,
          {
            id: selectedAddress.id,
          }
        );
        if (data.deletedCustomerAddressId) {
          dispatch({ type: "DELETE_SELECTED_ADDRESS", payload: selectedAddress })
          dispatch({ type: "DELETE_SELECTION", payload: null })
          setIsLoading(false);
          props.setPopUp((prevState) => ({
            ...prevState,
            delete: false,
          }));
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
  }

  return props.trigger ? ( 
    <div className="popup">
      <article className="popup-inner">
        <header>
          <h3>Είστε σίγουρος πως θέλετε να διαγράψετε την παρακάτω διεύθυνση;</h3>
        </header>
        <article className="delete-address-container">
          <section className='delete-address-info'>
            <span>{selectedAddress.address1},&nbsp;{selectedAddress.zip}</span>
            <span>{selectedAddress.firstName}&nbsp;{selectedAddress.lastName}</span>
          </section>
          <section className='delete-address-info'>
            <span>{selectedAddress.city},&nbsp;{selectedAddress.country}</span>
            <span>{selectedAddress.phone}</span>
          </section>
          {!isLoading ? 
            <section 
            style={{padding: "0"}}
            className="address-form-btns">
              <button 
              className="cancel-update-btn"
              onClick={() => (
                props.setPopUp((prevState) => ({
                  ...prevState,
                  delete: false,
                }))
              )}>
                  ΑΚΥΡΩΣΗ
              </button>
              <button 
              className="confirm-delete-btn"
              onClick={deleteOnClick}>
                  ΔΙΑΓΡΑΦΗ
              </button>
            </section>
          : 
          <div className="spinner">
            <div className="loadingio-spinner-ripple-hb4ksrtc1us">
              <div className="ldio-uua8zfoilp">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          }
        </article>
      </article>
    </div>
   ) : "";
}
 
export default DeleteAddressModal;