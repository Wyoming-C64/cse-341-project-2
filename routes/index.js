// ROOT ROUTES

const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swaggerDoc.json');

const rootCtrl = require('../controllers');
const rollingStock = require('./rollingStock');
const railroads = require('./railroads');

// API Documentation
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));


// All other routes
routes.get('/', rootCtrl.defaultRoute);
routes.use('/roster', rollingStock);
routes.use('/railroad', railroads)

module.exports = routes;