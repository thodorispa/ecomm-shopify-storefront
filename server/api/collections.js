require('dotenv').config()
import express from 'express'
import * as Collection from '../../utils/collectionUtils'

var router = express.Router()

router.get('/', async (req, res) => {

  try {
    const { collections, Errors } = await Collection.getAll();

    if (Errors) {
      return res.status(400).send(Errors.message);
    }
    
    res.send({ collections });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Get all products
router.get('/all', async (req, res) => {

  try {
    const { collections, Errors } = await Collection.getAllWithProducts();

    if (Errors) {
      return res.status(400).send(Errors.message);
    }
    
    res.send({ collections });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Get product with media by id 
router.get('/id/:id', async (req, res) => {


  try {
    const { collection, Errors } = await Collection.getById("gid://shopify/Collection/"+req.params.id);

    if (Errors) {
      return res.status(400).send(Errors.message);
    }

    res.send({ collection });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});

// Get product with media by id 
router.get('/:title', async (req, res) => {

  try {
    const { collection, Errors } = await Collection.getByTitle(req.params.title);

    if (Errors) {
      return res.status(400).send(Errors.message);
    }

    res.send({ collection });
  } catch (e) {
    console.log(e);
    return res.status(500).send({})
  }
});



export default router;


