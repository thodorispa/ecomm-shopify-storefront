import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const create = async (lines) => {
  let lineItems = '';
  for (let i = 0; i < lines.length; i++) {
    const { quantity, product } = lines[i];
    const variantId = product.variants[0].id;
    switch (i) {
      case 0:
        lineItems += `[{variantId: "${variantId}", quantity: ${quantity}}`;
        break;
      case lines.length - 1:
        lineItems += `, {variantId: "${variantId}", quantity: ${quantity}}]`;
        break;
      default:
        lineItems += `, {variantId: "${variantId}", quantity: ${quantity}}`;
        break;
    }
  }



  try {
    var query = await client.query({
      data: `mutation {
                checkoutCreate(input: {
                  lineItems: ${lineItems}
                  
                }) {
                  checkout {
                            id
                            webUrl
                          }
                        }
                }
        
        `,
    });



    var { checkout } = query.body.data.checkoutCreate;
    console.log(checkout);

  } catch (e) {
    console.log(e.response.errors);
    return { checkoutUserErrors: e.response.errors };
  }

  try {
    var accountQuery = await client.query({
      data: `mutation {
        checkoutCustomerAssociateV2(checkoutId: "${checkout.id}", customerAccessToken: "0b31b8460ef9163330b993e7223f2ab5") {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
          customer {
            id
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log("ASSOCIATE CUSTOMER: ", e.response.errors);
    return { checkoutUserErrors: e.response.errors };
  }

  // try {
  //   var emailQuery = await client.query({
  //     data: `mutation {
  //         checkoutEmailUpdateV2(checkoutId: "${checkout.id}", email: "t.pachis@yahoo.com"}) {
  //           checkout {
  //             id
  //             webUrl
  //           }
  //           checkoutUserErrors {
  //             # CheckoutUserError fields
  //           }
  //         }
  //               }
        
  //       `,
  //   });
  
  // } catch (e) {
  //   console.log("ASSOCIATE EMAIL: ", e.response.errors);
  //   return { checkoutUserErrors: e.response.errors };
  // }


  // const { checkoutEmail } = emailQuery.body.data.checkoutEmailUpdateV2;
  const checkout1  = accountQuery.body.data.checkoutCustomerAssociateV2.checkout;


  console.log("DSICOOOSOOS ", checkout1);

  return { checkout };
}
export {
  create
}