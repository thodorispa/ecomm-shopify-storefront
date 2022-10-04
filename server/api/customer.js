import { } from 'dotenv/config'
import express from 'express'
import * as Customer from '../../utils/customerUtils'

var router = express.Router()

// Create customer
router.post('/sign-up', async (req, res) => {

  const user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    phone: req.body.phone
  }
  
  const address = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address1: req.body.address1,
    city: req.body.city,
    country: req.body.country.label,
    zip: req.body.zip,
    phone: req.body.phone,
  }

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

router.get('/logout', async (req, res) => {
  res.cookie('accessToken', '', { maxAge: 0 })
  res.status(200).send()
})



export default router;