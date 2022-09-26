import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const create = async (lines) => {

  const address ={
    "address1": "123 Main St",
    "city": "San Francisco",
    "country": "US",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "555-555-5555",
    "zip": "94111"
  }
 

  

  try {
    var query = await client.query({
      // data: `
      // mutation {
      //   checkoutCreate(input: {lineItems: "${lines}"  }) {
      //             checkout {
      //               webUrl
      //             }
      //           }
      //         }
              
      //         `,
      data: `mutation {
checkoutCreate(input: {lineItems:[{ variantId: "gid://shopify/ProductVariant/41964670583025", 
quantity: 1 }, { variantId: "gid://shopify/ProductVariant/41964670583025", 
quantity: 1 }] }) {
          checkout {
            id
            webUrl
          }
        }
      }
      
      `,
    });
  const { checkout } = query.body.data.checkoutCreate;
  const id = checkout.id;
  console.log(checkout);
    var query2 = await client.query({
      data: `mutation 
        checkoutCustomerAssociateV2(
          id: "gid://shopify/Checkout/425fb526bda3ebadcf44b1071b17cfe7?key=08af77e4a1e24cd41cdfb4b6684545c3",
          customerAccessToken: "c491d66767d8ac847dd724c84a05afd7"
          ) {
          checkout {
            id 
            webUrl
          }
          checkoutUserErrors {
            # CheckoutUserError fields
          }
          customer {
            # Customer fields
          }
        }
      `
    })
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors } };
  }


  const test = query2.body.data.checkoutCustomerAssociateV2.checkout.webUrl;
  console.log(test);




  return { checkout };
}

export {
  create
}