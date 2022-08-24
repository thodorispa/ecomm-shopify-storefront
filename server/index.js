import { } from 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { Shopify, ApiVersion } from '@shopify/shopify-api'
const app = express();
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextjs = next({ dev })
const handle = nextjs.getRequestHandler()


const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME, PORT, MONGO_URI, NODE_ENV } = process.env;

////////////////////////////////////
// MongoDB Connect
////////////////////////////////////
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => console.log('DB Connected'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));

////////////////////////////////////
// Shopify Store Auth
////////////////////////////////////
const ACTIVE_SHOPIFY_SHOPS = {};

Shopify.Context.initialize({
    API_KEY,
    API_SECRET_KEY,
    SCOPES: [SCOPES],
    HOST_NAME: HOST.replace(/https?:\/\//, ""),
    HOST_SCHEME,
    IS_EMBEDDED_APP: false,
    API_VERSION: ApiVersion.July22
});


app.get("/", async function (req, res, next) {
    if (typeof ACTIVE_SHOPIFY_SHOPS[SHOP] !== 'undefined') {
        res.redirect('/teo');
    } else {
        res.redirect("/auth/shopify");
    }
});

app.get("/auth/shopify", async function (req, res, next) {
    const authRoute = await Shopify.Auth.beginAuth(req, res, SHOP, '/auth/shopify/callback', false);

    res.redirect(authRoute);
});

app.get("/auth/shopify/callback", async function (req, res, next) {
    try {
        const client_session = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query);
        ACTIVE_SHOPIFY_SHOPS[SHOP] = client_session.scope;
        console.log(client_session.accessToken);
    } catch (eek) {
        res.redirect("/auth/shopify");
        console.error("eek");
        res.send('<html><body><p>${JSON.stringify(eek)}</p></body></html>')
    }

    return res.redirect('/teo');
});

////////////////////////////////////
// Next.js React Connect
////////////////////////////////////
nextjs.prepare()
    .then(() => {


        app.get('/products', async (http_request, http_response) => {
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

            console.log(products);
            http_response.send(products);

        });
        app.get('*', (req, res) => {
            return handle(req, res)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

const httpServer = http.createServer(app);

httpServer.listen(3000, () => console.log('Listening on port 3000.'));
