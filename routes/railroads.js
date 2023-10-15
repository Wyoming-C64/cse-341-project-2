// CONTACTS ROUTES

const routes = require('express').Router();

const railroadController = require('../controllers/railroads');

routes.get('/', railroadController.getAll);
routes.get('/:id', railroadController.getOne);
routes.post('/', railroadController.postData);
routes.put('/:id', railroadController.putData);
routes.delete('/:id', railroadController.deleteData);

module.exports = routes;