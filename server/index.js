// import { } from 'dotenv/config'
import express from 'express';
import next from 'next'
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import user from './api/user'
import customer from './api/customer'
import checkout from './api/checkout'
import address from './api/address'
import product from './api/product'
import collections from './api/collections'
import cart from './api/cart'
import shopify from './api/shopify'
import * as Cart from '../utils/cartUtils'
import { getAll } from '../utils/collectionUtils'
import * as Customer from '../utils/customerUtils'

const { PORT, MONGO_URI, NODE_ENV } = process.env;

////////////////////////////////////
// MongoDB Connect
//////////////////////////////////
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
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


    try {
      const collectionsRes = await getAll();

      const collections = collectionsRes.collections

      if (collections) {
        req.collections = collections;
      }
    } catch (e) {
      console.log(e);
    }

    next()
  })

  server.use(async (req, res, next) => {
    req.env = NODE_ENV


    if (!req.cart && req.cookies.cart) {
      try {
        const existingCart = decodeURIComponent(req.cookies.cart) || null;

        const { cart } = await Cart.fetch(existingCart) || null;

        if (cart) {
          req.cart = cart
        } else {
          res.cookie('cart', '', { maxAge: 0 })
        }
      } catch (e) {
        res.cookie('cart', '', { maxAge: 0 })
        console.log(e);
      }
    }

    next()
  })

  server.use(async (req, res, next) => {
    req.env = NODE_ENV

    const accessToken = req.cookies.accessToken

    if (accessToken) {
      try {
        const customer = await Customer.getCustomer(accessToken)

        if (customer) {
          req.customer = customer;
        } else {
          res.cookie('accessToken', '', { maxAge: 0 })
        }
      } catch (e) {
        res.cookie('', '', { maxAge: 0 })
      }
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
  server.use('/api/checkout', checkout)
  server.use('/api/shopify', shopify)


  ////////////////////////////////////
  // App React Template
  ////////////////////////////////////
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT || 3000, () => console.log(`Listening on port ${PORT || 3000}, mode: ${NODE_ENV}`));
})


