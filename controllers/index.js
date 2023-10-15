// ROOT Controller
const About = require('../about');

const defaultRoute = async(req, res) => {
  /*  #swagger.summary = 'Return API name and version number.'
      #swagger.description = 'This endpoint simply returns an object containing the name of the API, version number, and author.'
      #swagger.responses[200] = { 
        description: "Returns the version information for the API.",
        schema: {
          name: "Railroad Roster REST API",
          version: "1.0.0",
          author: "Mike Lewis"
        } 
      }
  */
  console.log('/GET API VERSION:\n    200 - OK');
  res.setHeader('Content-Type', 'application/json');  
  res.status(200).json(About);
}

module.exports = {
  defaultRoute
};