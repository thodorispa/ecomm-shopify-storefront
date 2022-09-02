import { } from 'dotenv/config'
import express from 'express'
import Client from 'shopify-buy';

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

var router = express.Router()

const client = Client.buildClient({
  domain: SHOP,
  storefrontAccessToken: STOREFRONT_TOKEN
});

// Create cart
router.post('/:id', async (req, res) => {
  // get product id from req 
  const productId = req.params.id;

  // TODO: check if cart exists

  var checkout = await client.checkout.create();
  const lineItemsToAdd = [
    {
      variantId: GID + productId,
      quantity: 1,
      customAttributes: [{key: "MyKey", value: "MyValue"}]
    }
  ];

  // Add an item to the checkout
  const cart = await client.checkout.addLineItems(checkout.id, lineItemsToAdd).then((checkout) => {
    // Do something with the updated checkout
    console.log(checkout.lineItems); // Array with one additional line item
  });
  // return 200
  res.status(200);
})

// router.post('/view', async (req, res) => {
//   // get product id from req 
//   const productId = req.params.id;
//   console.log("geyt");

//   const data = await client.query({
//     data: `mutation {
//       cartCreate(
//         input: {
//           lines: [
//             {
//               quantity: 1
//               merchandiseId: "gid://shopify/ProductVariant/1"
//             }
//           ]
//           attributes: { key: "cart_attribute", value: "This is a cart attribute" }
//         }
//       ) {
//         cart {
//           id
//           createdAt
//           updatedAt
//           lines(first: 10) {
//             edges {
//               node {
//                 id
//                 merchandise {
//                   ... on ProductVariant {
//                     id
//                   }
//                 }
//               }
//             }
//           }
//           attributes {
//             key
//             value
//           }
//           cost {
//             totalAmount {
//               amount
//               currencyCode
//             }
//             subtotalAmount {
//               amount
//               currencyCode
//             }
//             totalTaxAmount {
//               amount
//               currencyCode
//             }
//             totalDutyAmount {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }

//     `,
//   });

//   console.log(data.body);
//   // return 200
//   res.status(200);
// })


export default router;


