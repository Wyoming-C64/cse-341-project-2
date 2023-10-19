// CONTACTS ROUTES

const routes = require('express').Router();

const rollingStock = require('../controllers/rollingStock');

routes.get('/', rollingStock.getAll);
routes.get('/:id', rollingStock.getOne);
routes.post('/', rollingStock.postData);
routes.put('/:id', rollingStock.putData);
routes.delete('/:id', rollingStock.deleteData);

module.exports = routes;