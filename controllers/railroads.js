// Railroad Company (Entity) Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');
const collection = 'railroads';

/////// GET ///////
const getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Return the entire list of railroads.'
    #swagger.description = 'Returns all reailroad entities in the collection. No filtering is applied.'
    #swagger.tags = ['Railroads']
    #swagger.responses[200] = {
      description: "All railroad entities are successfully fetched and returned in an array.",
      schema: [{
        _id: "0123456789abcdef01234567",
        reportingMark: 'TEST',
        railroadName: 'Test Every Single Track Company',
      }]
    }
    #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  console.log(`railroads/GET ALL: `);
  try {
    const result = await mongoDb.getDb()
      .db()
      .collection(collection)
      .find();
    // twinkleMyToes();
    result.toArray()
      .then( (lists) => {
        console.log(`    200 - OK`);
        res.setHeader('Content-Type', 'application/json');  
        res.status(200).json(lists); 
      });
  } catch (err) {
    console.log(`    500 - ${err.name}: ${err.message}`);
    res.status(500).send('Internal server or database error.');
    return false;
  }
};

const getOne = async (req, res, next) => {
  /*  #swagger.summary = 'Get a single railroad entity.'
      #swagger.description = 'Returns the railroad entity identified by `id`.'
      #swagger.tags = ['Railroads']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique 24-digit hexadecimal string that identifies the railroad entity.',
        type: 'string',
        format: 'hex'
      }
      #swagger.responses[200] = {
        description: "A single railroad entity identified by `id` is successfully returned.",
        schema: {
          _id: "0123456789abcdef01234567",
          reportingMark: 'TEST',
          railroadName: 'Test Every Single Track Company',
        }
      }
      #swagger.responses[400] = {
        description: 'Invalid ID provided.'
      }
      #swagger.responses[404] = {
        description: 'Not Found.'
      }
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */

  const paddedId = req.params.id.padStart(24,'0');
  console.log(`railroads/GET document ${paddedId}:`);
  if (!ObjectId.isValid(req.params.id)) {
    console.log('    400 - Invalid ID provided.');
    res.status(400).send('You must provide a valid ID (24-digit hexadecimal string).');
    return false;
  }
  
  const myObjId = new ObjectId(paddedId); 

  try {
    const result = await mongoDb.getDb()
      .db()
      .collection(collection)
      .findOne( {"_id": myObjId }
    );
    // twinkleMyToes();  
    if (result) {
      console.log(`    200 - OK`);
      res.setHeader('Content-Type', 'application/json');  
      res.status(200).json(result); 
    } else {
      console.log(`    404 - Not found.`);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain');  
        res.status(404).send('Not found.');  
      }
    }
  } catch (err) {
    console.log(`    500 - ${err}`);
    res.status(500).send('Internal server or database error.');
    return false;
  }
};

/////// POST ///////
const postData = async (req, res) => {
  console.log(`railroads/POST document: `);
  /*  #swagger.summary = 'Add a single railroad entity.'
      #swagger.description = 'Adds a record for a single railroad entity using information provided in a JSON body.'
      #swagger.tags = ['Railroads']
      #swagger.parameters['record'] = {
        in: 'body',
        description: 'A valid JSON object with required data elements populated.',
        type: 'object',
        format: 'json',
        schema: {
          $reportingMark: "TEST",
          $railroadName: "Test Every Single Track Company",
        }
      }
      #swagger.responses[201] = {
        description: "Created - A single railroad entity is added with the data given. The return result provides the newly assigned ID number.",
        schema: {
          acknowledged: true,
          insertedId: '<hexadecimal string>'
        }
      }
      #swagger.responses[422] = {
        description: 'Invalid or missing data error.'
      }
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  const record = req.body;
  try {
    const dbResult = mongoDb.getDb()
      .db()
      .collection(collection)
      .insertOne( record );
    // twinkleMyToes();
    dbResult.then( 
      (resultData) => {
        console.log(`    201 - Created. New ID = ${resultData.insertedId}`); 
        res.setHeader('Content-Type', 'application/json'); 
        res.status(201).json(resultData); 
      }
    );
  } catch (err) {
    console.log(`    500 - ${err.message}.`);
    res.status(500).send('Internal server or database error.');
    return false;
  }

};

/////// PUT ///////
const putData = async (req, res, next) => {
  let response = {};
  /*  #swagger.summary = 'Update a single railroad entity.'
      #swagger.description = 'Updates the railroad entity identified by `id` using information provided in a JSON body.'
      #swagger.tags = ['Railroads']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique 24-digit hexadecimal string that identifies the railroad entity.',
        type: 'string',
        format: 'hex',
      } 
      #swagger.parameters['record'] = {
        in: 'body',
        description: 'A valid JSON object populated with one or more data fields to be changed.',
        type: 'object',
        format: 'json',
        schema: {
          $reportingMark: "TEST",
          $railroadName: "Test Every Single Track Company"
        }
      }
      #swagger.responses[204] = {
        description: "Success - The single railroad entity identified by `id` is updated with the new data. No data is returned other than this status.",
      }
      #swagger.responses[400] = {
        description: "Invalid ID provided.",
      }
      #swagger.responses[404] = {
        description: "Not found.",
      }
      #swagger.responses[422] = {
        description: "Invalid or missing data error.",
      }
      #swagger.responses[500] = {
        description: "Internal server or database error.",
      }
  */
  const paddedId = req.params.id.padStart(24,'0');
  console.log(`railroads/PUT document ${paddedId}:`);

  if (!ObjectId.isValid(req.params.id)) {
    console.log('    400 - Invalid ID provided.');
    res.status(400).send('You must provide a valid ID (24-digit hexadecimal string).');
    return false;
  }
  
  const myObjId = new ObjectId(paddedId); 

  // const record = {
  //   reportingMark: req.body.reportingMark,
  //   railroadName: req.body.railroadName
  // }
  try {
    const dbResult = mongoDb.getDb()
      .db()
      .collection(collection)
      .findOneAndUpdate( {"_id": myObjId }, {$set: req.body} );
    // twinkleMyToes();   
    dbResult.then( 
      (resultData) => {
        response = resultData.lastErrorObject.updatedExisting ? {
          code: 204,
          text: "Success (no content)"
        } : {
          code: 404,
          text: "Not found."
        };
        console.log(`    ${response.code} - ${response.text}`); 
        res.setHeader('Content-Type', 'text/plain'); 
        res.status(response.code).send(response.text);
      }
    )
  } catch (err) { 
    console.log(`    500 - ${err}`);
    res.setHeader('Content-Type', 'text/plain'); 
    res.status(500).send("Internal server or database error.");
    return false;
  }
  
};


/////// DELETE ///////
const deleteData = async (req, res, next) => {
  /*  #swagger.summary = 'Delete a single railroad entity.'
      #swagger.description = 'Deletes a railroad entity identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a roster record was actually deleted.'
      #swagger.tags = ['Railroads']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique 24-digit hexadecimal string that identifies the railroad entity.',
        type: 'string',
        format: 'hex',
      } 
      #swagger.responses[200] = {
        description: "The single railroad entity identified by `id` is deleted from the collection if it exists. The response is an object containing an aknowledgement and the number of matching roster records deleted.",
        schema: {
          acknowledged: true,
          deletedCount: 1
        }
      }
      #swagger.responses[400] = {
        description: "Invalid ID provided.",
      }
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  const paddedId = req.params.id.padStart(24,'0');
  console.log(`railroads/DELETE document ${paddedId}:`);

  if (!ObjectId.isValid(req.params.id)) {
    console.log('    400 - Invalid ID provided.');
    res.status(400).send('You must provide a valid ID (24-digit hexadecimal string).');
    return false;
  }
  
  const myObjId = new ObjectId(paddedId);

  try {
    const dbResult = mongoDb.getDb()
      .db()
      .collection(collection)
      .deleteOne(
        {"_id": myObjId }
    );
    // twinkleMyToes();
    dbResult.then( 
      (resultData) => {
        console.log(`    200 - Success - Documents deleted = ${resultData.deletedCount}`); 
        res.setHeader('Content-Type', 'application/json'); 
        res.status(200).json(resultData);
      }
    );
  } catch (err) {
    console.log(`    500 - ${err.message}`)
    res.status(500).send('Internal server or database error.');
    return false;
  }
}


module.exports = {
  getAll,
  getOne,
  postData,
  putData,
  deleteData
};