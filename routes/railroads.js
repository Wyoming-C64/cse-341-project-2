// CONTACTS ROUTES

const routes = require('express').Router();

const railroadController = require('../controllers/railroads');

const validation = require("../middleware/validation-middleware");

routes.get('/', railroadController.getAll);
routes.get('/:id', railroadController.getOne);
routes.post('/', validation.saveRailroadEntry, railroadController.postData);
routes.put('/:id', validation.saveRailroadEntry, railroadController.putData);
routes.delete('/:id', railroadController.deleteData);

module.exports = routes;