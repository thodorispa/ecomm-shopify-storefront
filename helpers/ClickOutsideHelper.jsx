import React, {useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';

export const UseOutsideAlerter = async (ref, dispatch) => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch({ type: "DELETE_SELECTION", payload: null })
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
}