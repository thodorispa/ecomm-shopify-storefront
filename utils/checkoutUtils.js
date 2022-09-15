import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const create = async (lines) => {

  try {
    var query = await client.query({
      data: `mutation {
        checkoutCreate(input: {lineItems: "${lines}"  }) {
                  checkout {
                    webUrl
                  }
                }
              }
              
              `,
//       data: `mutation {
// checkoutCreate(input: {lineItems:[{ variantId: "gid://shopify/ProductVariant/41964670583025", 
// quantity: 1 }, { variantId: "gid://shopify/ProductVariant/41964670583025", 
// quantity: 1 }] }) {
//           checkout {
//             webUrl
//           }
//         }
//       }
      
//       `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors } };
  }

  const { checkout } = query.body.data.checkoutCreate;

  console.log(checkout);

  return { checkout };
}

export {
  create
}