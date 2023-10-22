const routes = require('express').Router();

let swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swaggerDoc.json');

function swDoc() {
// Wrapper function so I can add the documentation for this route.
// API Documentation
  /*  
    #swagger.summary = 'Provide documentation for this API.'
    #swagger.description = 'Executes the main Swagger documentation page handler.'
    #swagger.tags = ['API Documentation']
    #swagger.responses[200] = {
        description: "A functioning web page is returned allowing the user to navigate the documentation. No JSON data is returned on this route.",
    }
  */
  let result = null;
  try {
    result = swaggerUi.setup(swaggerDocument);
    console.log('\nInitialized API documentation interface.');
    
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
  return result;
}

routes.use('/', swaggerUi.serve);
routes.get('/', swDoc());

module.exports = routes;