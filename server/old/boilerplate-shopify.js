import { } from 'dotenv/config'
import express from 'express'
import { Shopify, ApiVersion } from '@shopify/shopify-api'

var router = express.Router()


const ACTIVE_SHOPIFY_SHOPS = {};

router.get('/', async (http_request, http_response) => {
    if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
        http_response.redirect('/auth');
    } else {
        http_response.send('<html><body><p>Your Node instance is running.</p></body></html>');
    }
});

router.get('/auth', async (http_request, http_response) => {
    let authorizedRoute = await Shopify.Auth.beginAuth(
        http_request,
        http_response,
        SHOP,
        '/auth/callback',
        false,
    );
    return http_response.redirect(authorizedRoute);
});

router.get('/auth/callback', async (http_request, http_response) => {
    try {
        const client_session = await Shopify.Auth.validateAuthCallback(
            http_request,
            http_response,
            http_request.query);
        ACTIVE_SHOPIFY_SHOPS[SHOP] = client_session.scope;
        console.log(client_session.accessToken);
    } catch (eek) {
        console.error(eek);
        http_response.send('<html><body><p>${JSON.stringify(eek)}</p></body></html>')
    }
    return http_response.redirect('/teo');
});

router.get('/auth/success', async (http_request, http_response) => {
    console.log("authed");

    http_response.send('<html><body><p>You have successfully authenticated and are back at your router.</p></body></html>');
});

router.get('/products', async (http_request, http_response) => {
    const client_session = await Shopify.Utils.loadCurrentSession(http_request, http_response);
    console.log('client_session: ' + JSON.stringify(client_session));

    const client = new Shopify.Clients.Rest(client_session.shop, client_session.accessToken);

    const products = await client.get({
        path: 'products'
    });
    console.log('Products: ' + JSON.stringify(products));

    let product_names_formatted = '';
    for (let i = 0; i < products.body.products.length; i++) {
        product_names_formatted += '<p>' + products.body.products[i].title + '</p>';
    }

    http_response.send(products);

});

export default router;


