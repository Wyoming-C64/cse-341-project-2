// ROOT Controller
const About = require('../about');

const getProfile = async(req, res) => {
  /*  #swagger.summary = 'Return profile data for the logged in user.'
      #swagger.description = 'This endpoint simply returns an object containing all of the pertinent information of the logged in user.'
      #swagger.tags = ['Profile']
      #swagger.responses[200] = { 
        description: "Returns the user information for the currently logged in user.",
        schema: {
          unknown: 'true'
        } 
      }
      #swagger.responses[403] = { 
        description: "Forbidden - (Must be logged in.)",
      }
      #swagger.responses[500] = { 
        description: "Internal server error.",
      }
  */
  try {
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(req.oidc.user);
    console.log('    200 - OK');
  } catch (err) {
    res.setHeader('Content-Type', 'application/text');  
    res.status(500).send('Internal server error.');
    console.log(`    500 - ${err.name}: ${err.message}`);
  }
}

module.exports = {
  getProfile
};