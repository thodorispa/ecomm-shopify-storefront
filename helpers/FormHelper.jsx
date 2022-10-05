import React, {useState, useEffect} from 'react';
import validator from "validator";

export const handleAddressData = (input, address, setAddress) => (e) => {
  let value = "";
  if (input === "phone" || input === "country") {
    value = e;
  } else {
    value = e.target.value;
  }
  setAddress((prevState) => ({
    ...prevState,
    [input]: value,
  }));
};
export const handleFormData = (input, values, setValues) => (e) => {
  let value = "";
  if (input === "phone" || input === "country") {
    value = e;
  } else {
    value = e.target.value;
  }
  setValues((prevState) => ({
    ...prevState,
    [input]: value,
  }));
};


export const validate = (values) => {
  const error = {};

  if (!values.firstName) {
    error.firstName = "First Name is required";
  }
  if (!values.lastName) {
    error.lastName = "Last Name is required";
  }
  if (!values.address1) {
    error.address = "Street Address is required";
  }

  if (!values.city) {
    error.city = "City or Town is required";
  }

  if (!values.country) {
    error.country = "Country is required";
  }
  if (!values.zip) {
    error.zip = "Zip Code is required";
  }
  if (!values.phone) {
    error.phone = "Mobile Phone is required";
  } else if (!validator.isMobilePhone(values.phone)) {
    error.phone = "This is not a valid mobile phone format";
  }

  return error;
};