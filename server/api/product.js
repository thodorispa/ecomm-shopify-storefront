import { } from 'dotenv/config'
import express from 'express'
import { Shopify, ApiVersion } from '@shopify/shopify-api'
import request from 'request-promise'

const { SHOP, STOREFRONT_TOKEN } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

var router = express.Router()

var gid = "gid://shopify/Product/"

// Get all products
router.get('/all', async (req, res) => {

  const data = await client.query({
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


  const products = data.body?.data?.products?.edges?.map(n => {
    return {
      id: n.node.id.replace(gid, ""),
      title: n.node.title,
      publishedAt: n.node.publishedAt,
    }
  }) || [];

  res.send({ products });

});

// Get a product by id
router.get('/data/:id', async (req, res) => {
  const productId = req.params.id; 

  const data = await client.query({
    data: `query  {
      product(id: "${gid + productId}") {
        title
        id
      }
    }`,
  });
  
  res.send(data.body.data.product);
});

// Get a product with media by id 
router.get('/:id', async (req, res) => {
  var productId = req.params.id; 

  const data = await client.query({
    data: `query {
      product(id: "${gid + productId}") {
        id
        title
        media(first: 10) {
          edges {
            node {
              mediaContentType
              alt
              ...mediaFieldsByType
            }
          }
        }
      }
    }
    fragment mediaFieldsByType on Media {
      ...on ExternalVideo {
        id
        embeddedUrl
      }
      ...on MediaImage {
        image {
          url
        }
      }
      ...on Model3d {
        sources {
          url
          mimeType
          format
          filesize
        }
      }
      ...on Video {
        sources {
          url
          mimeType
          format
          height
          width
        }
      }
    }`,
  });

  const product = data.body?.data?.product || null;

  if (!product) {
    return res.status(404).send({})
  }


  product.id = product.id.replace(gid, "");
  product.title = product.title;
  product.media = product.media.edges[0]?.node;

  res.send({ product });
});


export default router;


