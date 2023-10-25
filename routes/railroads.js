// CONTACTS ROUTES

const routes = require('express').Router();

const railroadController = require('../controllers/railroads');
const { requiresAuth } = require('express-openid-connect');
const validation = require("../middleware/validation-middleware");

// Allow All Read Access
routes.get('/', railroadController.getAll);
routes.get('/:id', railroadController.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), validation.saveRailroadEntry, railroadController.postData);
routes.put('/:id', requiresAuth(), validation.saveRailroadEntry, railroadController.putData);
routes.delete('/:id', requiresAuth(), railroadController.deleteData);

module.exports = routes;