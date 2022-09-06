import { } from 'dotenv/config'
import express from 'express';

var router = express.Router()

router.get('/user', (req, res) => {
  res.sendStatus(2020)
  console.log();
})

export default router