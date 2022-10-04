import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const findAll = async (accessToken) => {
  try {
    var query = await client.query({
      data: `query {
        customer(customerAccessToken: "${accessToken}") {
          id
          defaultAddress {
            id
                firstName
                lastName
                address1
                country
                zip
                city
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

  const addresses = {}
  addresses.default = customer.defaultAddress;
  addresses.all = customer.addresses.edges.map((n) => n.node);
  
  return { addresses };
}

const create = async (address, accessToken) => {
  try {
    var query = await client.query({
      data: `mutation {
        customerAddressCreate(
          customerAccessToken: "${accessToken}"
          address: {
            lastName: "${address.lastName}"
            firstName: "${address.firstName}"
            address1: "${address.address1}"
            country: "${address.country}"
            city: "${address.city}"
            zip: "${address.zip}"
            phone: "${address.phone}"
          }
        )
        {
          customerUserErrors {
            code
            field
            message
          }
          customerAddress {
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
      `,
    });
  } catch (e) {
    console.log(e.response.errors || e);
    return { customerUserErrors: e.response.errors };
  }

  const { customerAddress, customerUserErrors } = query.body.data.customerAddressCreate || null;

  return { customerAddress, customerUserErrors };
}

const update = async (address, accessToken) => {
  try {
    var query = await client.query({
      data: `mutation{
        customerAddressUpdate(address: {
          lastName: "${address.lastName}"
          firstName: "${address.firstName}"
          address1: "${address.address1}" 
          country: "${address.country}"
          city: "${address.city}"
          zip: "${address.zip}"
          phone: "${address.phone}"
        }, customerAccessToken: "${accessToken}", id: "${address.id}") {
          customerAddress {
            id
          }
          customerUserErrors {
            code
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  }

  const { customerAddress, customerUserErrors } = query.body.data || null;

  return { customerAddress, customerUserErrors };
}

const deleteById = async (id, accessToken) => {
  try {
    var query = await client.query({
      data: `mutation {
        customerAddressDelete(
          customerAccessToken: "${accessToken}"
          id: "${id}"
        ) {
          customerUserErrors {
            code
            field
            message
          }
          deletedCustomerAddressId
        }
      }
      
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  }

  const { deletedCustomerAddressId, customerUserErrors } = query.body.data.customerAddressDelete || null;

  return { deletedCustomerAddressId, customerUserErrors };
}


export {
  findAll,
  create,
  update,
  deleteById
}