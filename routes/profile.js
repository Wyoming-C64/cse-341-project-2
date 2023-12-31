// USER PROFILE ROUTE(S)

const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const profileController = require('../controllers/profile');

routes.get('/', requiresAuth(), profileController.getProfile);

module.exports = routes;