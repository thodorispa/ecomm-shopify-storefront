import { } from 'dotenv/config'
import express from 'express'
import * as Checkout from '../../utils/checkoutUtils'

var router = express.Router()

// Create cart
router.post('/create', async (req, res) => {
  const cart = req.body.lines;
  
  const lines = [];
  for (let i = 0; i < cart.length; i++) {
    const line = cart[i];
    lines.push({
      variantId: "\""+(line.merchandise.id) + "\"",
      quantity: line.quantity,
    });
  }

  try {

    var { checkout, Errors } = await Checkout.create(lines);

    if (Errors) {
      return res.status(400).send(Errors.message);
    }

    // Add cookie valid for 10 days
    // res.cookie('cart', cart.id, { maxAge: 86400000 * 10 });
    res.send({ checkout });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});
export default router;


