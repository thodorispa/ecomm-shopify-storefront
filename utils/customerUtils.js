import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

/*
  Creates a Customer in Shopify
*/
const create = async (user) => {
  try {
    var query = await client.query({
      data: `mutation {
        customerCreate(
          input: {
            firstName: "${user.firstName}"
            lastName: "${user.lastName}"
            email: "${user.email}"
            phone: "${user.phone}"
            password: "${user.password}"
          }
        ) {
          customerUserErrors {
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
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  }

  const { customer, customerUserErrors } = query.body.data.customerCreate || null;

  if (customer) {
    var { customerAccessToken } = await createAccessToken(user);
  } else {
    console.log(customerUserErrors);
  }

  return { customer, customerUserErrors, customerAccessToken };
}

const getCustomer = async (accessToken) => {
  try {
    var query = await client.query({
      data: `query {
        customer(customerAccessToken: "${accessToken}") {
          id
          firstName
          lastName
          email
          phone
          defaultAddress {
            id
          }
          addresses(first: 10) {
            edges {
              node {
                id
                firstName
                lastName
                address1
                country
                zip
                city
              }
            }
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  } 

  const { customer } = query.body.data;

  if (!customer) {
    return { customerUserErrors: [{ message: "No customer found" }] };
  }

  customer.addresses = customer.addresses.edges.map((n) => n.node);


  return { customer };
}

const createAccessToken = async (user) => {
  try {
    var query = await client.query({
      data: `mutation {
          customerAccessTokenCreate(
            input: { 
              email: "${user.email}",
              password: "${user.password}" 
            }
          ) {
            customerUserErrors {
              code
              field
              message
            }
            customerAccessToken {
              accessToken
              expiresAt
            }
          }
        }        
        `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  }

  const { customerAccessToken, customerUserErrors } = query.body.data.customerAccessTokenCreate || null;

  return { customerAccessToken, customerUserErrors};
}


export {
  create,
  createAccessToken,
  getCustomer,
}