// PROFILE Controller

const getProfile = async(req, res) => {
  console.log('profile/GET');
  /*  #swagger.summary = 'Return profile data for the logged in user.'
      #swagger.description = 'This endpoint simply returns an object containing all of the pertinent information of the logged in user.'
      #swagger.tags = ['Profile']
      #swagger.responses[200] = { 
        description: "Returns the user information for the currently logged in user. The example below represents the minimum data returned for a basic user. More information may be provided depending on the authorization method used.",
        schema: {
          sid: "<string>",
          nickname: "someUser",
          name: "Some User Fullname",
          picture: "<url>",
          updated_at: "2023-10-25T06:18:15,350Z",
          email: "validemail@domain.com",
          email_verified: "< true | false >",
          sub: "<string>"
        }
      }
      #swagger.responses[403] = { 
        description: "Forbidden - (Must be logged in... Although, it would seem that the backend will redirect to the login page, so this may never actually show.)",
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