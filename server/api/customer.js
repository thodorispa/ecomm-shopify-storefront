require('dotenv').config()
import express from 'express'
import * as Customer from '../../utils/customerUtils'
import * as Order from '../../utils/orderUtils'

var router = express.Router()

// Create customer
router.post('/sign-up', async (req, res) => {

  const user = req.body.values
  const address = req.body.address

  try {
    const { customer, customerUserErrors, customerAccessToken } = await Customer.create(user, address);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    const expiresAt = new Date(customerAccessToken.expiresAt) - new Date().getTime();

    res.cookie("accessToken", customerAccessToken.accessToken, { maxAge: expiresAt });
    return res.status(200).send({ customer, customerAccessToken });
  } catch (e) {

    console.log(e);
    res.status(500).send({});
  }
});

router.post('/login', async (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  try {
    const { customerAccessToken, customerUserErrors } = await Customer.createAccessToken(user);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0]?.message);
    }

    const customer = await Customer.getCustomer(customerAccessToken.accessToken);


    const expiresAt = new Date(customerAccessToken.expiresAt) - new Date().getTime();

    res.cookie("accessToken", customerAccessToken.accessToken, { maxAge: expiresAt });
    res.send({ customer, customerAccessToken });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.get('/', async (req, res) => {
  try {
    const { customer, customerUserErrors } = await Customer.getCustomer(req.cookies.accessToken);

    if (customerUserErrors) {
      return res.status(400).send(customerUserErrors[0]?.message);
    }

    res.send({ customer });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.post('/update', async (req, res) => {
  const targetCustomer  = req.body.targetCustomer;
  try {
    const { customer, customerUserErrors } = await Customer.update(targetCustomer, req.cookies.accessToken);

    if (customerUserErrors) {
      return res.status(400).send(customerUserErrors[0]?.message);
    }

    const expiresAt = new Date(customerAccessToken.expiresAt) - new Date().getTime();

    res.cookie("accessToken", customerAccessToken.accessToken, { maxAge: expiresAt });
    res.send({ customer });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.get('/logout', async (req, res) => {
  res.cookie('accessToken', '', { maxAge: 0 })
  res.status(200).send()
})



export default router;