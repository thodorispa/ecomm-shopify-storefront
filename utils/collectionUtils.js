import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const getAll = async () => {
  try {
    var query = await client.query({
      data: `query {
        collections(first: 50) {
          edges {
            node {
              id
              title
              description
              image {
                src
                altText
              }
            }
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors[0]);
    return { Errors: e.response.errors[0] };
  }


  const collections = query.body.data.collections.edges.map(n => {
    return {
      id: n.node.id,
      title: n.node.title.replace(/\s+/g, '-'),
      description: n.node.description,
      images: {
        src: n.node.image?.src,
        altText: n.node.image?.altText
      }
    } || [];
  });

  return { collections };
}

const getAllWithProducts = async () => {
  try {
    var query = await client.query({
      data: `query {
        collections(first: 50) {
          edges {
            node {
              id
              title
              description
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
    console.log(e.response.errors[0]);
    return { Errors: e.response.errors[0] };
  }

  const collections = query.body.data.collections.edges.map(n => {
    return {
      id: n.node.id,
      title: n.node.title,
      description: n.node.description,
      products: n.node.products.edges?.map(n => {
        return {
          id: n.node.id,
          title: n.node.title,
          publishedAt: n.node.publishedAt,
          images: n.node.images.edges.map(n => n.node)
        }
      }) || []
    } || [];
  });

  return { collections };
}

const getById = async (id) => {
  try {
    var query = await client.query({
      data: `query {
        collection(id: "${id}") {
          id
          title
          description
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
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors[0]);
    return { Errors: e.response.errors[0] };
  }

  const { collection } = query.body.data;
  collection.products = collection.products.edges.map(n => {
    return {
      id: n.node.id.replace(GID, ''),
      title: n.node.title,
      publishedAt: n.node.publishedAt,
      images: n.node.images.edges.map(n => n.node),
      variants: n.node.variants.edges.map(n => n.node)
    }
  });

  return { collection };
}

const getByTitle = async (title) => {
  const titleActual = decodeURIComponent(title).replace(/-/g, ' ');

  try {
    var query = await client.query({
      data: `query {
        collections(query:"title:${titleActual}" first: 1) {
          edges {
            node {
              id
              title
              description
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
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors[0]);
    return { Errors: e.response.errors[0] };
  }

  const res = query.body.data.collections.edges.map(n => {
    return {
      id: n.node.id,
      title: n.node.title,
      description: n.node.description,
      products: n.node.products.edges?.map(n => {
        return {
          id: n.node.id,
          title: n.node.title,
          publishedAt: n.node.publishedAt,
          images: n.node.images.edges.map(n => n.node),
          variants: n.node.variants.edges.map(n => n.node)
        }
      }) || []
    } || [];
  });

  const collection = res[0];

  return { collection };
}


export {
  getAll,
  getAllWithProducts,
  getById,
  getByTitle
}