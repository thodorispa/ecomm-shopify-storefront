import React, {useState, useMemo, useEffect} from 'react'
import Select from 'react-select';
import countryList from 'react-select-country-list';


const AddressForm = (props) => {

  console.log(props.popUp);
  const options = useMemo(() => countryList().getData(), [])

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      padding: state.selectProps.padding,
      color: '#111b0d',
      maxWidth: "200px "
    }),
    indicatorsContainer: () => ({
      padding: '7px',
    }),
  }

  return (props.trigger) ? (
    <>
    <header className='popup'>
      <article className='popup-inner'>
      <h1>Επεξεργασία στοιχείων διεύθυνσης</h1>
      <form className="forms">
          <h3 style={{opacity: "0.7", fontWeight: "100", textAlign: "center"}}>Billing Information</h3>
            <article>
              <div className="input-container">
              <input
                type="text"
                name="address1"
                defaultValue={props.address.address1}
                className="forms-input"
                // onChange={handleFormData("address1")}
              />
              <label className="filled">Street Address</label>
              </div>
              {/* <section className="validate">
                <i className={errors.address ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.address}</small>
              </section> */}
            </article>
            <article>
            <div className="input-container">
              <input
                type="text"
                name="city"
                defaultValue={props.address.city}
                className="forms-input"
                // onChange={handleFormData("city")}
              />
              <label className="filled">Town/City</label>
              </div>
              {/* <section className="validate">
                <i className={errors.city ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.city}</small>
              </section> */}
            </article>
            <article>
            <div className="input-container">
            <Select 
            placeholder={'Country'} 
            className="country-input" 
            styles={customStyles} 
            theme={(theme) => ({
              ...theme,
              borderRadius: "7px",
              padding: "15px",
              colors: {
                ...theme.colors,
                primary25: '#d3d0ae',
                primary50: '#d3d0ae',
                primary: '#111b0d',
                neutral10: 'rgb(254, 255, 251)',
                neutral20: '#111b0d',
                neutral30: '#111b0d',
                neutral70: 'rgb(254, 255, 251)',
                neutral80: 'rgb(87, 96, 78)',
                neutral90: '#A19E84'
              },
            })}
            options={options} 
            defaultValue={props.address.country} 
            // onChange={handleCountry} 
            />
              </div>
              {/* <section className="validate">
                <i className={errors.country ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.country}</small>
              </section> */}
            </article>
            <article>
            <div className="input-container">
              <input
                type="text"
                name="zip"
                defaultValue={props.address.zip}
                className="forms-input"
                // onChange={handleFormData("zip")}
              />
              <label className="filled">Zip Code</label>
              </div>
              {/* <section className="validate">
                <i className={errors.zip ? "fa-solid fa-exclamation" : ""}></i>
                <small style={{ paddingLeft: "5px" }}>{errors.zip}</small>
              </section> */}
            </article>
          </form>
        <button className='close-btn'
        onClick={(e) => {
          e.preventDefault()
          props.setPopUp(false)
        } }>close</button>
          {props.children}
      </article>
    </header>
    </>
  ) : ""
}
export default AddressForm;