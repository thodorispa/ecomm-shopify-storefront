// import { } from 'dotenv/config'
import express from 'express';
import next from 'next'
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import user from './api/user'
import customer from './api/customer'
import address from './api/address'
import product from './api/product'
import collections from './api/collections'
import cart from './api/cart'
import shopify from './api/shopify'
import * as Cart from '../utils/cartUtils'

const { PORT, MONGO_URI, NODE_ENV } = process.env;

////////////////////////////////////
// MongoDB Connect
//////////////////////////////////
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => console.log('DB Connected'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));


////////////////////////////////////
// App Init
////////////////////////////////////
const app = next({ dev: NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.enable('trust proxy')
  server.use(cors({ 
    credentials: true,
    origin: ['http://localhost:3000']
  }))
  server.use(express.static('public'));
  server.use(express.static('dist'));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json({ limit: '20mb' }));
  server.use(cookieParser())
  server.use(async (req, res, next) => {
    req.env = NODE_ENV

    if (req.url.indexOf('/_next/') > -1) {
      return next()
    }

    if (NODE_ENV === 'production' && !req.secure) {
      return res.redirect('https://' + req.headers.host + req.url)
    }

    if (!req.cart && req.cookies.cart) {
      const existingCart = decodeURIComponent(req.cookies.cart) || null;
      req.cart = await Cart.fetch(existingCart);
    }

    next()
  })

  ////////////////////////////////////
  // App Routes
  ////////////////////////////////////
  server.use('/api/user', user)
  server.use('/api/customer', customer)
  server.use('/api/address', address)
  server.use('/api/product', product)
  server.use('/api/collections', collections)
  server.use('/api/cart', cart)
  server.use('/api/shopify', shopify)


  ////////////////////////////////////
  // App React Template
  ////////////////////////////////////
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT || 3000, () => console.log(`Listening on port ${PORT || 3000}, mode: ${NODE_ENV}`));   
})


