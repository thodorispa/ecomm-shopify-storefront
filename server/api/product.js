import { } from 'dotenv/config'
import express from 'express'
import * as Product from '../../utils/productsUtils'

var router = express.Router()

// Get all products
router.get('/all', async (req, res) => {

  try {
    const { products, Errors } = await Product.fetchAll();

    if (Errors) {
      return res.status(400).send(Errors.message);
    }
    
    res.send({ products });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Get product with media by id 
router.get('/:id', async (req, res) => {
 
  try {
    const product = await Product.fetchById(req.params.id);

    res.send({ product });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Get product by id
// router.get('/data/:id', async (req, res) => {
//   const productId = req.params.id;

//   const data = await client.product.fetch(productId) || null;

//   if (!data) {
//     return res.status(404).send({})
//   }

//   res.send(data.body.data.product);
// });


export default router;


