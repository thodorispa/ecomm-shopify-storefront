require('dotenv').config()
import { Shopify } from '@shopify/shopify-api'
import * as Address from './addressUtils.js'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const create = async (user, address) => {
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

  var { customer, customerUserErrors } = query.body.data.customerCreate || null;

  if (customer) {
    var { customerAccessToken } = await createAccessToken(user);
    var { customerAddress } = await Address.create(address, customerAccessToken.accessToken);

  } else {
    console.log(customerUserErrors);
  }


  customer = {
    ...customer,
    ...customerAddress
  }



  return { customer, customerUserErrors, customerAccessToken, customerAddress };
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
            firstName
            lastName
            address1
            country
            zip
            city
            phone
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
                phone
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

  return { customerAccessToken, customerUserErrors };
}

const update = async (targetCustomer, accessToken) => {

  try {
    var query = await client.query({
      data: `mutation {
        customerUpdate(customer: {
          firstName: "${targetCustomer.firstName}"
          lastName: "${targetCustomer.lastName}"
          email: "${targetCustomer.email}"
          phone: "${targetCustomer.phone}"
        },
          customerAccessToken: "${accessToken}") {
          customer {
            id
            firstName
            lastName
            email
            phone
            defaultAddress {
              id
              firstName
              lastName
              address1
              country
              zip
              city
              phone
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
                  phone
                }
              }
            }
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  }

  const { customer, customerUserErrors, customerAccessToken } = query.body.data.customerUpdate || null;
  

  return { customer, customerUserErrors, customerAccessToken };
}

export {
  create,
  createAccessToken,
  getCustomer,
  update
}