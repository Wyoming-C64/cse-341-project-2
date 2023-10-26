// ROOT ROUTES

const routes = require('express').Router();

const { auth, requiresAuth } = require('express-openid-connect');

const apiDocs = require('./apiDocs');

const rootCtrl = require('../controllers');
const rollingStock = require('./rollingStock');
const railroads = require('./railroads');
const profile = require('./profile');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Login/logout
// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));
console.log('OpenID Connect initialized.');

// req.isAuthenticated is provided from the auth router
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// API Documentation
routes.use('/api-docs', apiDocs);

// User Profile
routes.use('/profile', profile);

// All other routes
routes.get('/', rootCtrl.defaultRoute);
routes.use('/roster', rollingStock);
routes.use('/railroad', railroads)

module.exports = routes;