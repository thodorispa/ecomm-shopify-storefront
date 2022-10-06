import { } from 'dotenv/config'
import express from 'express'
import * as Address from '../../utils/addressUtils'

var router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { addresses, customerUserErrors } = await Address.findAll(req.cookies.accessToken);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ addresses });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.post('/create', async (req, res) => {

  const {address} = req.body

  try {
    const { customerAddress, customerUserErrors } = await Address.create(address, req.cookies.accessToken);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ customerAddress });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.post('/update', async (req, res) => {
  const { address } = req.body

  try {
    const { customerAddress, customerUserErrors } = await Address.update(address, req.cookies.accessToken);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ customerAddress });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});



router.post('/update-default', async (req, res) => {
  const { addressId } = req.body

  try {
    const { customer, customerUserErrors } = await Address.updateDefault(addressId, req.cookies.accessToken);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ customer });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { deletedCustomerAddressId, customerUserErrors } = await Address.deleteById(req.body.id, req.cookies.accessToken);

    if (customerUserErrors.length > 0) {
      return res.status(400).send(customerUserErrors[0].message);
    }

    res.send({ deletedCustomerAddressId });
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});


export default router;