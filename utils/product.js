export const productQuery = await storefrontClient.query({
  data: `{
    product (id: "gid://shopify/Product/${req.params.id}") {
      availableForSale
      descriptionHtml
      id
      title
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      tags
      totalInventory
      options {
        name
        values
      }
      images(first: 30) {
        edges {
          node {
            altText
            url
            width
            height
          }
        }
      }
      variants(first: 30) {
        edges {
          node {
            id
            priceV2 {
              amount
              currencyCode
            }
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
      ${getCollections ? `collections(first: 30) {
        edges {
          node {
            id
            title
          }
        }
      }` : ''}
    }
  }`,
})