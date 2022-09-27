import { } from 'dotenv/config'
import { Shopify } from '@shopify/shopify-api'
import Cart from '../server/models/cart'

const { SHOP, STOREFRONT_TOKEN, GID } = process.env;

const client = new Shopify.Clients.Storefront(SHOP, STOREFRONT_TOKEN);

const createAndAdd = async (productId, quantity, product) => {
  const totalAmount = product.variants[0].priceV2.amount * quantity;

  const cartDB = new Cart({
    lines: [{
      product,
      // parse quantity to int
      quantity: parseInt(quantity)
    }],
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: product.variants[0].priceV2.currencyCode
      },
      subtotalAmount: {
        amount: totalAmount,
        currencyCode: product.variants[0].priceV2.currencyCode
      },
      totalTaxAmount: {
        amount: 0,
        currencyCode: product.variants[0].priceV2.currencyCode
      },
      totalDutyAmount: {
        amount: 0,
        currencyCode: product.variants[0].priceV2.currencyCode
      }
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  try {
    var cart = await cartDB.save()
  } catch (e) {
    console.log(e);
    return { Errors: { message: e } };
  }

  return { cart };
}

const add = async (cartId, productId, quantity, product) => {

  try {
    // fetch cart from mongo
    var cartDB = await Cart.findById(cartId);

    if (cartDB) {
      const line = cartDB.lines.findIndex((n => n.product.id === productId));

      if (line >= 0) {
        cartDB.lines[line].quantity += parseInt(quantity);
      } else {
        cartDB.lines.push({
          product,
          quantity: parseInt(quantity)
        });
      }

      cartDB.cost.totalAmount.amount += product.variants[0].priceV2.amount * quantity;


      cartDB.updatedAt = Date.now();

      cartDB.markModified('lines');

      var cart = await cartDB.save();
    } else {
      return { Errors: { message: 'Cart not found' } };
    }

  } catch (e) {
    console.log(e);
    return { Errors: { message: e } };
  }

  return { cart };
}

const update = async (cartId, productId, quantity, product) => {
  try {
    // fetch cart from mongo
    var cartDB = await Cart.findById(cartId);

    if (cartDB) {
      const line = cartDB.lines.findIndex((n => n.product.id === productId));

      if (line >= 0) {
        const quantityInCart = cartDB.lines[line].quantity;

        if (quantityInCart === 1) {
          remove(cartDB, cartDB.lines[line].id);

        } else {
          cartDB.lines[line].quantity = quantityInCart - 1;
          cartDB.cost.totalAmount.amount -= product.variants[0].priceV2.amount;
        }

      }

      cartDB.updatedAt = Date.now();

      cartDB.markModified('lines');

      var cart = await cartDB.save();
    } else {
      return { Errors: { message: 'Cart not found' } };
    }

  } catch (e) {
    console.log(e);
    return { Errors: { message: e } };
  }

  return { cart };
}

const remove = async (cartId, product) => {
  try {
    var cartDB = await Cart.findById(cartId);

    const line = cartDB.lines.findIndex((n => n.product.id === product.id));

    cartDB.cost.totalAmount.amount -= cartDB.lines[line].product.variants[0].priceV2.amount * cartDB.lines[line].quantity;
    cartDB.lines.splice(line, 1);
    cartDB.updatedAt = Date.now();
    cartDB.markModified('lines');

    var cart = await cartDB.save();
  } catch (e) {
    console.log(e);
    return { Errors: { message: e } };
  }

  return { cart };
}

const fetch = async (id) => {

  try {
    const cart = await Cart.findById(id);

    if (cart) {
      return { cart };
    } else {
      return { Errors: { message: 'Cart not found' } };
    }


  } catch (e) {
    console.log(e);
    return { Errors: { message: e } };
  }
}


export {
  fetch,
  createAndAdd,
  add,
  update,
  remove
}