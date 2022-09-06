// import { } from 'dotenv/config'
import express from 'express';
import next from 'next'
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { Shopify, ApiVersion } from '@shopify/shopify-api';

import product from './api/product.js'
import cart from './api/cart.js'
import shopify from './api/shopify.js'

const { PORT, MONGO_URI, NODE_ENV } = process.env;

////////////////////////////////////
// MongoDB Connect
////////////////////////////////////
// mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connection.on('open', () => console.log('DB Connected'));
// mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));


////////////////////////////////////
// App Init
////////////////////////////////////
const app = next({ dev: NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  // server.enable('trust proxy')
  // server.use(cors({ 
  //   origin: ['http://localhost:3000'],
  //   credentials: true
  // }))
  server.use(express.static('public'));
  server.use(express.static('dist'));
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json({ limit: '20mb' }));
  server.use(cookieParser())
  server.use(async (req, res, next) => {
    req.env = NODE_ENV
    
    if (NODE_ENV === 'production' && !req.secure) {
      return res.redirect('https://' + req.headers.host + req.url)
    }
    

    // ADMIN CALL
    //   var productId = '7354920009969'
    //   const product = await client.get({
    //     path: `products/${productId}`,
    //     query: {id: 1, title: "title"}
    //   });
      
    next()
  })

  ////////////////////////////////////
  // App Routes
  ////////////////////////////////////
  server.use('/api/product', product)
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


