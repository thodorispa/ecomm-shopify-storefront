import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const createAndAdd = async (productId, quantity) => {
  try {
    var query = await client.query({
      data: `mutation {
        cartCreate(
          input: {
            lines: [
              {
                quantity: ${quantity}
                merchandiseId: "${productId}"
              }
            ]
          }
        ) {
          cart {
            id
            createdAt
            updatedAt
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      priceV2 {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        ... on Product {
                          title
                        }
                      }
                    }
                  }
                  
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors } };
  }

  const { cart } = query.body.data.cartCreate;
  cart.lines = cart.lines.edges.map(n => n.node);

  return { cart };
}

const add = async (cartId, prodcutId, quantity) => {
  try {
    var query = await client.query({
      data: `mutation {
        cartLinesAdd(
          cartId: "${cartId}"
          lines: {
            merchandiseId: "${prodcutId}"
            quantity: ${quantity}
          }
        ) {
          cart {
            id
            createdAt
            updatedAt
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      priceV2 {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        ... on Product {
                          title
                        }
                      }
                    }
                  }
                  
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }      
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors } };
  }

  const { cart } = query.body.data.cartLinesAdd;
  cart.lines = cart.lines.edges.map(n => n.node);

  return { cart };
}

const updateQuantity = async (cartId, lineId, quantity) => {
  try {
    var query = await client.query({
      data: `mutation {
        cartLinesUpdate(
          cartId: "${cartId}"
          lines: {
            id: "${lineId}"
            quantity: ${quantity}
          }
        ) {
          cart {
            id
            createdAt
            updatedAt
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      priceV2 {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        ... on Product {
                          title
                        }
                      }
                    }
                  }
                  
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }      
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors } };
  }

  const { cart } = query.body.data.cartLinesAdd;
  cart.lines = cart.lines.edges.map(n => n.node);

  return { cart };
}

const remove = async (cartId, lineId) => {
  try {
    var query = await client.query({
      data: `mutation {
        cartLinesRemove(
          cartId: "${cartId}"
          lineIds: ["${lineId}","${lineId}"]
        ) {
          cart {
            id
            createdAt
            updatedAt
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }      
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
    return { Errors: { message: e.response.errors } };
  }

  const { cart } = query.body.data.cartLinesAdd;
  cart.lines = cart.lines.edges.map(n => n.node);

  return { cart };
}

const fetch = async (id) => {
  try {
    var query = await client.query({
      data: `query {
        cart(id: "${id}") {
          id
          createdAt
          updatedAt
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      ... on Product {
                        title
                      }
                    }
                  }
                }
                
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
      }
      `,
    });
  } catch (e) {
    console.log(e.response.errors);
  }

  const { cart } = query.body.data;
  cart.lines = cart.lines.edges.map(n => n.node);

  return { cart };
}


export {
  fetch,
  createAndAdd,
  add,
  updateQuantity,
  remove
}