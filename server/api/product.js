import { } from 'dotenv/config'
import express from 'express'
// import Client from 'shopify-buy';
import Client from 'shopify-buy/index.unoptimized.umd';


const { SHOP, STOREFRONT_TOKEN, GID } = process.env;
var router = express.Router()


// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: SHOP,
  storefrontAccessToken: STOREFRONT_TOKEN
});


// Get all products
router.get('/all', async (req, res) => {
  const checkoutId = req.cookies.checkout;
  const data = await client.product.fetchAll();

  if (!data) {
    return res.status(404).send({})
  }

  const products = data.map(n => {
    return {
      id: n.id.replace(GID, ""),
      title: n.title,
      publishedAt: n.publishedAt,
    }
  }) || [];

  res.send({ products });

});

// Get product by id
router.get('/data/:id', async (req, res) => {
  const productId = req.params.id;

  const data = await client.product.fetch(productId) || null;

  if (!data) {
    return res.status(404).send({})
  }

  res.send(data.body.data.product);
});

// Get product with media by id 
router.get('/:id', async (req, res) => {
  var productId = GID + req.params.id;

  const data = await client.product.fetch(productId) || null;

  if (!data) {
    return res.status(404).send({})
  }

  const product = {
    id: data.id.replace(GID, ""),
    title: data.title,
    publishedAt: data.publishedAt,
    media: {
      src: data.images[0]?.src,
      alt: data.images[0]?.alt,
    }
  }
  res.send({ product });
});


export default router;


