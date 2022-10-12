require('dotenv').config()
import jwt from 'jsonwebtoken';

import User from '../models/user';

const { JWT_SECRET } = process.env

const authMiddleware = async (req, res, next) => {
  if (req.user || req.clientApp) {
    next()
  } else {
    res.status(404).send()
  }
}

const loose_authMiddleware = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return next()
  }

  try {
    var token = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (e) {
    return next()
  }

  if (token && token.user && token.user._id) {
    const user = await User.aggregate([
      { $match: { _id: token.user._id } },
    ])
    if (!user[0]) {
      return next()
    } else {
      req.user = user[0]
      return next()
    }
  } else if (token && token.app && token.app._id) {
    const app = await App.aggregate([
      { $match: { _id: token.app._id } },
    ])
    if (!app[0]) {
      return next()
    } else {
      req.clientApp = app[0]
      return next()
    }
  } else {
    return next()
  }
}

export { authMiddleware, loose_authMiddleware }