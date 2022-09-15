import { } from 'dotenv/config'
import express from 'express'
import * as Cart from '../../utils/cartUtils'

var router = express.Router()

// Create cart
router.post('/add', async (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const existingCart = decodeURIComponent(req.cookies.cart) || null;

  try {
    if (req.cookies.cart) {
      var { cart, Errors } = await Cart.add(existingCart, productId, quantity);
    } else {
      var { cart, Errors } = await Cart.createAndAdd(productId, quantity);
    }

    if (Errors) {
      return res.status(400).send(Errors.message);
    }

    // Add cookie valid for 10 days
    res.cookie('cart', cart.id, { maxAge: 86400000 * 10 });
    res.send({ cart });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Create cart
router.post('/update', async (req, res) => {
  const lineId = req.body.lineId;
  const newQuantity = req.body.quantity;
  const existingCart = decodeURIComponent(req.cookies.cart) || null;

  try {
    var { cart, Errors } = await Cart.update(existingCart, lineId, newQuantity);

    if (Errors) {
      return res.status(400).send(Errors.message);
    }

    // Add cookie valid for 10 days
    res.cookie('cart', cart.id, { maxAge: 86400000 * 10 });
    res.send({ cart });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Create cart
router.post('/remove', async (req, res) => {
  const lineId = req.body.lineId;
  console.log(lineId);
  const existingCart = decodeURIComponent(req.cookies.cart) || null;

  try {
    var { cart, Errors } = await Cart.remove(existingCart, lineId);

    if (Errors) {
      return res.status(400).send(Errors.message);
    }

    // Add cookie valid for 10 days
    res.cookie('cart', cart.id, { maxAge: 86400000 * 10 });
    res.send({ cart });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

export default router;


