import { } from 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import Client from 'shopify-buy';


const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

var router = express.Router()

const client = Client.buildClient({
  domain: SHOP,
  storefrontAccessToken: STOREFRONT_TOKEN
});

router.get('/', async (req, res) => {
  const checkoutId = req.cookies.checkout || null; 

  if(checkoutId) {
    var checkout = await client.checkout.fetch(req.cookies.checkout) || null;
  }

  if (!checkout) {
    return res.send({})
  }

  res.send({ checkout });
});

// Add item to cart
router.post('/add/:id', async (req, res) => {
  const productGid = GID + req.params.id;
  const checkoutId = req.cookies.checkout;

  // Check if checkout exists
  if (!checkoutId) {
    var checkout = await client.checkout.create();

    res.cookie('checkout', checkout.id, { maxAge: 86400000, httpOnly: true });
  } else {
    var checkout = await client.checkout.fetch(checkoutId);
    
    res.cookie('checkout', checkout.id, { maxAge: 86400000, httpOnly: true });
  }

  // Fetch product 
  const product = await client.product.fetch(productGid) || null;

  // search if item is already in cart if yes update quantity else add new item
  const existingItem = checkout.lineItems.find(n => n.variant.id === product.variants[0].id) || null;

  if (existingItem) {
    // Update quantity
    var updatedCheckout = await client.checkout.updateLineItems(checkout.id, [
      {
        id: existingItem.variant[0].id,
        quantity: existingItem.quantity + 1
      }
    ]);
  } else {
    // Add new item
    var updatedCheckout = await client.checkout.addLineItems(checkout.id, [
      {
        variantId: product.variants[0].id,
        quantity: 1
      }
    ]);
  }

  console.log(updatedCheckout);
  res.status(200).send({ updatedCheckout });
})

// Remove item from cart
router.post('/remove/:id', async (req, res) => {
  const productGid = GID + req.params.id;
  const checkoutId = req.cookies.checkout;

  // Fetch checkout
  var checkout = await client.checkout.fetch(checkoutId);
  
  // Fetch product 
  const product = await client.product.fetch(productGid) || null;

  // Check if product is in cart and has more than 1 quantity
  const existingItem = checkout.lineItems.find(n => n.variant.id === product.variants[0].id).then(async n => {
    if (n.quantity > 1) {
      // Update quantity
      var updatedCheckout = await client.checkout.updateLineItems(checkout.id, [
        {
          id: existingItem.variant[0].id,
          quantity: existingItem.quantity - 1
        }
      ]);
    } else {
      // Remove item
      var updatedCheckout = await client.checkout.removeLineItems(checkout.id, [
        {
          variantId: product.variants[0].id,
        }
      ]);
    }
  }) || null

  res.status(200).send({ updatedCheckout });
})


export default router;


