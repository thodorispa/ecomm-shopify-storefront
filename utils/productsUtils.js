import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const fetchAll = async () => {
  try {
    var data = await client.query({
      data: `query {
        products(first: 50) {
          edges {
            node {
              id
              title
              publishedAt
            }
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
  }

  console.log(data.body.data.product);
  const products = data.body.data.products.edges.map(n => {
    return {
      id: n.node.id.replace(GID, ""),
      title: n.node.title,
      publishedAt: n.node.publishedAt,
    } || [];
  });

  return products;
}

const fetchById = async (id) => {
  try {
    var data = await client.query({
      data: `query {
        product(id: "${GID}${id}") {
          id
          title
          description
          productType
          publishedAt
          tags
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
  }

  const { product } = data.body.data;
  product.images = product.images.edges.map(n => n.node);
  product.variants = product.variants.edges.map(n => n.node);


  return product;
}


export {
  fetchAll,
  fetchById,
}