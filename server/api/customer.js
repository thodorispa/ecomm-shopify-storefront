import { } from 'dotenv/config'
import express from 'express'
import * as Customer from '../../utils/customerUtils'

var router = express.Router()

// Create customer
router.get('/sign-up', async (req, res) => {

  const user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    phone: req.body.phone
  }

  try {
    const { customer, customerUserErrors, customerAccessToken } = await Customer.create(user);

    if (customerUserErrors[0]?.message) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    const expiresAt = new Date(customerAccessToken.expiresAt) - new Date().getTime();

    res.cookie("accessToken", customerAccessToken.accessToken, { maxAge: expiresAt });
    res.send({ customer, customerAccessToken });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.get('/login', async (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  try {
    const { customerUserErrors, customerAccessToken } = await Customer.createAccessToken(user);

    if (customerUserErrors[0]?.message) {
      return res.status(400).send(customerUserErrors[0].message);
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



export default router;