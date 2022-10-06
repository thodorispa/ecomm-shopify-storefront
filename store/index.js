import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import cartReducer from './reducers/cartReducer.js'
import collectionsReducer from './reducers/collectionsReducer.js'
import authReducer from './reducers/userReducer.js'
import sideCartReducer from './reducers/sideCartReducer.js'
import sideNavReducer from './reducers/sideNavReducer.js'
import selectedAddressReducer from './reducers/focusedAddressReducer.js'

export const store = createStore(
  combineReducers({
    customer: authReducer,
    cart: cartReducer,
    collections: collectionsReducer,
    cartClasses: sideCartReducer,
    sideNav: sideNavReducer,
    selectedAddress: selectedAddressReducer,
  }),
  {
    customer: false,
    cart: null,
    collections: null,
    cartClasses: "side-cart",
    sideNav: false,
    selectedAddress: null,
  },
  // typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(applyMiddleware(thunk))
)