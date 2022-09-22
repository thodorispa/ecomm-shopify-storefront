import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import cartReducer from './reducers/cartReducer.js'
import authReducer from './reducers/userReducer.js'
import sideCartReducer from './reducers/sideCartReducer.js'
import sideNavReducer from './reducers/sideNavReducer.js'

export const store = createStore(
  combineReducers({
    customer: authReducer,
    cart: cartReducer,
    cartClasses: sideCartReducer,
    sideNav: sideNavReducer,
  }),
  {
    customer: false,
    cart: null,
    cartClasses: "side-cart",
    sideNav: false,
  },
  // typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(applyMiddleware(thunk))
)