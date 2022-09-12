import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import R_Cart from './cart.js'

export const store = createStore(
  combineReducers({
    cart: R_Cart,
  }),
  {
    cart: { cart: [] },
  },
  // typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(applyMiddleware(thunk))
)