import 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const fetchAll = async (email) => {
  try {
    var query = await client.query({
      data: `query {
        orders(query:"email: t@aqgva.com" first: 20) {
          edges {
            node {
              id
              name
              email
            }
          }
        }
      }`,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { customerUserErrors: e.response.errors };
  }
  const res  = query.body.data.order.edges.map(n => {
    console.log(n);
  })


  
  

  return { res };
}

export {
  fetchAll
}