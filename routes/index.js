// ROOT ROUTES

const routes = require('express').Router();
const apiDocs = require('./apiDocs');

const rootCtrl = require('../controllers');
const rollingStock = require('./rollingStock');
const railroads = require('./railroads');

// API Documentation
routes.use('/api-docs', apiDocs);

// All other routes
routes.get('/', rootCtrl.defaultRoute);
routes.use('/roster', rollingStock);
routes.use('/railroad', railroads)

module.exports = routes;