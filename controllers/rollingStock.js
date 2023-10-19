// Rolling Stock Controller

const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');
const collection = 'rollingStock';

/////// GET ///////
const getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Return the entire roster.'
    #swagger.description = 'Returns all roster records in the collection. No filtering is applied.'
    #swagger.tags = ['Roster']
    #swagger.responses[200] = {
      description: "All roster records are successfully fetched and returned in an array.",
      schema: [{
          _id: "0123456789abcdef01234567",
          reportingMark: "TEST",
          carNumber: "123456",
          aarCarType: "XM",
          carLength: 480,
          carHeight: 186,
          color: "Brown",
          ltWeight: 50000,
          ldLimit: 150000,
          capacity: 125000,
          units: "pounds",
          builtMonth: 1,
          builtYear: 1988
        }]
    }
    #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  console.log(`roster/GET ALL: `);
  
  const result = await mongoDb.getDb()
    .db()
    .collection(collection)
    .find();

  result.toArray()
    .then( (lists) => {
      console.log(`    200 - OK`);
      res.setHeader('Content-Type', 'application/json');  
      res.status(200).json(lists); 
    })
    .catch( (err) => {
      console.log(`    500 - ${err.message}`);
      res.status(500).send('Internal server or database error.');
    });
};

const getOne = async (req, res, next) => {
  /*  #swagger.summary = 'Get a single roster record.'
      #swagger.description = 'Returns the roster record identified by `id` for a single piece of rolling stock.'
      #swagger.tags = ['Roster']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the roster record of a rolling stock item.',
        type: 'string',
        format: 'hexadecimal'
      }
      #swagger.responses[200] = {
        description: "A single rolling stock roster record identified by `id` is successfully returned.",
        schema: {
          _id: "0123456789abcdef01234567",
          reportingMark: "TEST",
          carNumber: "123456",
          aarCarType: "XM",
          carLength: 480,
          carHeight: 186,
          color: "Brown",
          ltWeight: 50000,
          ldLimit: 150000,
          capacity: 125000,
          units: "pounds",
          builtMonth: 1,
          builtYear: 1988
        }
      }
      #swagger.responses[404] = {
        description: 'Not Found.'
      }
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */

  const paddedId = req.params.id.padStart(24,'0');
  const myObjId = new ObjectId(paddedId);
  
  console.log(`roster/GET document ${paddedId}:`);
  
  const result = await mongoDb.getDb()
    .db()
    .collection(collection)
    .findOne( {"_id": myObjId })
    .catch( (err) => {
      console.log(`    500 - ${err}`);
      res.status(500).send('Internal server or database error.');
      return false;
    });
  
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
  
}

/////// POST ///////
const postData = async (req, res) => {
  console.log(`roster/POST document: `);
  /*  #swagger.summary = 'Add a single roster record.'
      #swagger.description = 'Adds a record for a single piece of rolling stock using information provided in a JSON body.'
      #swagger.tags = ['Roster']
      #swagger.parameters['record'] = {
        in: 'body',
        description: 'A valid JSON object with required data elements populated.',
        type: 'object',
        format: 'json',
        schema: {
          $reportingMark: "TEST",
          $carNumber: "123456",
          $aarCarType: "XM",
          $carLength: 480,
          $carHeight: 186,
          $color: "Brown",
          $ltWeight: 50000,
          $ldLimit: 150000,
          $capacity: 125000,
          $units: "pounds",
          $builtMonth: 1,
          $builtYear: 1988
        }
      }
      #swagger.responses[201] = {
        description: "Created - A single roster record is added with the data given. The return result provides the newly assigned ID number.",
        schema: {
          acknowledged: true,
          insertedId: '<hexadecimal string>'
        }
      }
      #swagger.responses[400] = {
        description: 'Bad or missing data error.'
      }
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  const record = req.body;
  if ( 
    record.reportingMark && 
    record.carNumber &&
    record.aarCarType &&
    record.carLength &&
    record.carHeight &&
    record.color &&
    record.ltWeight &&
    record.ldLimit &&
    record.capacity &&
    record.units &&
    record.builtMonth &&
    record.builtYear
  ) {
    
    const dbResult = mongoDb.getDb()
      .db()
      .collection(collection)
      .insertOne( record );

    dbResult.then( 
      (resultData) => {
        console.log(`    201 - Created. New ID = ${resultData.insertedId}`); 
        res.setHeader('Content-Type', 'application/json'); 
        res.status(201).json(resultData); 
      }
    )
    .catch( (err) => {
      console.log(`    500 - ${err.message}.`);
      res.status(500).send('Internal server or database error.');
    });

  } else {
    console.log(`    400 - Bad or missing data error.`);
    res.status(400).send('Bad or missing data error.');
  }
    
};

/////// PUT ///////
const putData = async (req, res, next) => {
  let response = {};
  /*  #swagger.summary = 'Update a single roster record.'
      #swagger.description = 'Updates the roster record identified by `id` using information provided in a JSON body.'
      #swagger.tags = ['Roster']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the roster record of a rolling stock item.',
        type: 'string',
        format: 'hexadecimal',
      } 
      #swagger.parameters['record'] = {
        in: 'body',
        description: 'A valid JSON object populated with one or more data fields to be changed.',
        type: 'object',
        format: 'json',
        schema: {
          $reportingMark: "TEST",
          $carNumber: "123456",
          $aarCarType: "XM",
          $carLength: 480,
          $carHeight: 186,
          $color: "Brown",
          $ltWeight: 50000,
          $ldLimit: 150000,
          $capacity: 125000,
          $units: "pounds",
          $builtMonth: 1,
          $builtYear: 1988
        }
      }
      #swagger.responses[204] = {
        description: "Success - The roster record identified by `id` is updated with the new data. No data is returned other than this status.",
      }
      #swagger.responses[404] = {
        description: "Not found.",
      }
      #swagger.responses[500] = {
        description: "Internal server or database error.",
      }
  */
  const paddedId = req.params.id.padStart(24,'0');
  const myObjId = new ObjectId(paddedId);

  // const record = {
  //   reportingMark: req.body.reportingMark,
  //   carNumber: req.body.carNumber,
  //   aarCarType: req.body.aarCarType,
  //   carLength: req.body.carLength,
  //   carHeight: req.body.carHeight,
  //   color: req.body.color,
  //   ltWeight: req.body.ltWeight,
  //   ldLimit: req.body.ldLimit,
  //   capacity: req.body.capacity,
  //   units: req.body.units,
  //   builtMonth: req.body.builtMonth,
  //   builtYear: req.body.builtYear
  // }

  console.log(`roster/PUT document ${paddedId}:`);
  const dbResult = mongoDb.getDb()
    .db()
    .collection(collection)
    .findOneAndUpdate( {"_id": myObjId }, {$set: req.body} );   
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
  .catch ( (err) => {
    console.log(`    ${paddedId}: 500 - ${err}`);
    res.setHeader('Content-Type', 'text/plain'); 
    res.status(500).send("Internal server or database error.");
  });
  
};


/////// DELETE ///////
const deleteData = async (req, res, next) => {
  /*  #swagger.summary = 'Delete a single roster item.'
      #swagger.description = 'Deletes a roster record identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a roster record was actually deleted.'
      #swagger.tags = ['Roster']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique ID for the rolling stock roster record to be deleted.',
        type: 'string',
        format: 'hexadecimal',
      } 
      #swagger.responses[200] = {
        description: "The roster record identified by `id` for a single piece of rolling stock is deleted from the collection if it exists. The response is an object containing an aknowledgement and the number of matching roster records deleted.",
        schema: {
          acknowledged: true,
          deletedCount: 1
        }
      }
      #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  const paddedId = req.params.id.padStart(24,'0');
  const myObjId = new ObjectId(paddedId);

  console.log(`roster/DELETE document ${paddedId}:`);

  const dbResult = mongoDb.getDb()
    .db()
    .collection(collection)
    .deleteOne(
      {"_id": myObjId }
  );   
  dbResult.then( 
    (resultData) => {
      console.log(`    200 - Success - Documents deleted = ${resultData.deletedCount}`); 
      res.setHeader('Content-Type', 'application/json'); 
      res.status(200).json(resultData);
    }
  )
  .catch( (err) => {
    console.log(`DELETE document ${paddedId}: 500 - ${err.message}`)
    res.status(500).send('Internal server or database error.');
  });
};


module.exports = {
  getAll,
  getOne,
  postData,
  putData,
  deleteData
};