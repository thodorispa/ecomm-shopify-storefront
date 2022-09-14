import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const fetchAll = async () => {
  try {
    var query = await client.query({
      data: `query {
        products(first: 50) {
          edges {
            node {
              id
              title
              publishedAt
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
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors }};
  }


  const products  = query.body.data.products.edges.map(n => {
    return {
      id: n.node.id.replace(GID, ''),
      title: n.node.title,
      publishedAt: n.node.publishedAt,
      images: n.node.images.edges.map(n => n.node),
      variants: n.node.variants.edges.map(n => n.node)
    } || [];
  });

  return { products };
}

const fetchById = async (id) => {
  try {
    var query = await client.query({
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
                quantityAvailable
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

  const { product } = query.body.data;
  product.images = product.images.edges.map(n => n.node);
  product.variants = product.variants.edges.map(n => n.node);


  return product;
}


export {
  fetchAll,
  fetchById,
}