// CONTACTS ROUTES

const routes = require('express').Router();

const rollingStock = require('../controllers/rollingStock');
const { requiresAuth } = require('express-openid-connect');
const validation = require("../middleware/validation-middleware");

// Allow All Read Access
routes.get('/', rollingStock.getAll);
routes.get('/:id', rollingStock.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), validation.saveRosterEntry, rollingStock.postData);
routes.put('/:id', requiresAuth(), validation.saveRosterEntry, rollingStock.putData);
routes.delete('/:id', requiresAuth(), rollingStock.deleteData);

module.exports = routes;