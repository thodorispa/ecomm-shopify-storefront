import { } from 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import next from 'next'
import { Shopify, ApiVersion } from '@shopify/shopify-api'

import http from 'http'
const dev = process.env.NODE_ENV !== 'production'
const nextjs = next({ dev })
const handle = nextjs.getRequestHandler()



const { PORT, MONGO_URI, NODE_ENV } = process.env
const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME } = process.env;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME,
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.July22
});

// MongoDB Connect
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => console.log('DB Connected'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));


import account from '../api/account.js'
import shopify from './boilerplate-shopify.js'



nextjs.prepare()
  .then(() => {

    const app = express()


    const httpServer = http.createServer(nextjs);

    httpServer.listen(3000, () => console.log('Listening on port 3000.'));
    // API Routes
    app.use('/api/account', account)
    app.use('/api/shopify', shopify)

    app.get('*', (req, res) => {
      return handle(req, res)
    })

  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })