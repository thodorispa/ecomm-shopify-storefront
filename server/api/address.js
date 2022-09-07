import { } from 'dotenv/config'
import express from 'express'
import * as Address from '../../utils/addressUtils'

var router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { addresses, customerUserErrors } = await Address.findAll(req.cookies.accessToken);
    
    if (customerUserErrors) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ addresses });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.get('/create', async (req, res) => {

  const address = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address1: req.body.address1,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
    phone: req.body.phone,
  }

  try {
    const { customerAddress, customerUserErrors } = await Address.create(address, req.cookies.accessToken);

    if (customerUserErrors) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ customerAddress });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.get('/update/:id', async (req, res) => {
  const address = {
    id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address1: req.body.address1,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
    phone: req.body.phone,
  }

  try {
    const { customerAddress, customerUserErrors } = await Address.update(address, req.cookies.accessToken);

    if (customerUserErrors) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    console.log(customerAddress);
    res.send({ customerAddress });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.get('/delete', async (req, res) => {
  try {
    const { deletedCustomerAddressId, customerUserErrors } = await Address.deleteById(req.body.id, req.cookies.accessToken);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0]?.message);
    }

    res.send({ deletedCustomerAddressId });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});


export default router;