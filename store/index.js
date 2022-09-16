import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import cartReducer from './reducers/cartReducer.js'
import authReducer from './reducers/userReducer.js'

export const store = createStore(
  combineReducers({
    user: authReducer,
    cart: cartReducer,
  }),
  {
    user: false,
    cart: null,
  },
  // typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(applyMiddleware(thunk))
)