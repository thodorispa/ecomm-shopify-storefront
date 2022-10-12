require('dotenv').config()

import express from 'express';
import Validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { authMiddleware } from '../middlewares/auth'
import SharedUtils from '../../shared/user'

const { JWT_SECRET } = process.env

var router = express.Router()

router.get('/user', authMiddleware, (req, res) => {
  if (req.user) {
    res.status(200).send({ 
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      } 
    })
  } else {
    res.status(404).send()
  }
})

router.post('/login', async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).send()
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
      return res.status(404).send("Invalid Password")
    }

    const payload = { _id: user._id, username: user.username, email: user.email, role: user.role }
    const token = jwt.sign(payload, JWT_SECRET)

    user.lastLoginAt = Date.now()

    await user.save()

    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).send({ user: payload })
  } catch (e) {
    console.log(e); 
    return res.status(500).send()
  }
})

router.post('/oauth', async (req, res) => {
  try {
    const { accessKeyId, secretAccessKey } = req.body
    const app = await App.findOne({ accessKeyId, secretAccessKey })

    if (!app) { return res.status(404).send() }

    const payload = { _id: app._id, name: app.name, logo: app.logo }
    const token = jwt.sign(payload, JWT_SECRET)

    res.status(200).send({ token })
  } catch (e) {
    console.log(e); 
    return res.status(500).send()
  }
})

router.post('/sign-up', async (req, res) => {
  try {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2

    const existingUser = await User.findOne({ $or: [ { username }, { email } ] })
    if (existingUser) {
      return res.status(404).send("Email already exists")
    }

    if (SharedUtils().invalidUsername(username)) {
      return res.status(404).send(SharedUtils().invalidUsername(username))
    }

    if (!Validator.isEmail(email)) {
      return res.status(404).send("Invalid Email")
    }

    if (password !== password2) {
      return res.status(404).send("Password doesn't match")
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      username,
      email,
      password: passwordHash,
      createdAt: Date.now(),
      lastLoginAt: Date.now()
    })

    await user.save()

    const token = jwt.sign({ user }, JWT_SECRET)
    
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).send({ token: token, user: { _id: user._id, username: user.username, email: user.email } })
  } catch (e) {
    console.log(e);
    return res.status(500).send()
  }
})

router.get('/logout', async (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 })
  res.status(200).send()
})

// PASSWORD HASH
router.get('/hash/:pass', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash("Nick!190388", salt)
  console.log(hash); 
})


export default router