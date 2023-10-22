// CONTACTS ROUTES

const routes = require('express').Router();

const rollingStock = require('../controllers/rollingStock');

const validation = require("../middleware/validation-middleware");

routes.get('/', rollingStock.getAll);
routes.get('/:id', rollingStock.getOne);
routes.post('/', validation.saveRosterEntry, rollingStock.postData);
routes.put('/:id', validation.saveRosterEntry, rollingStock.putData);
routes.delete('/:id', rollingStock.deleteData);

module.exports = routes;