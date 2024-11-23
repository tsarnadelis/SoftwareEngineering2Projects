'use strict';

var utils = require('../utils/writer.js');
var LicensePlate = require('../service/LicensePlateService');

 
module.exports.modifyPlate = function(req, res) {
  const { userId, licensePlate } = req.body;  // Extracting userId and licensePlate from the request body

   // Check if the required fields are present
   if (!userId) {
    return res.status(400).json({ message: "Missing required field: userId" });
  }
  if (!licensePlate) {
    return res.status(400).json({ message: "Missing required field: licensePlate" });
  }

  //chec for invalid usrId
  if (typeof userId !== 'number' || userId <= 0) {
    return res.status(400).json({ message: "Invalid userId: must be a positive integer" });
  }
 // Check for a valid licensePlate
if ( typeof licensePlate !== 'string') {
  return res.status(400).json({ message: "Invalid licensePlate: must be a non-empty string" });
}
if ( typeof licensePlate !== 'string' ) {
  return res.status(400).json({ message: "licensePlate should be string" });
}


  LicensePlate.modifyPlate({ userId, licensePlate }) // Call to service layer to update the license plate
    .then((updatedPlate) => {
      res.status(200).json(updatedPlate);  // Return 200 status with updated data if successful
    })
    .catch((error) => {
      res.status(error.response.statusCode || 500).json({ error: error.message });  // Error handling (default to 500 if no statusCode is defined)
    });
};




exports.registerPlate = function(req, res, next) {
  const { userId, licensePlate } = req.body;

  // Validation check for missing userId
  if (!userId) {
    return res.status(400).json({ message: "Missing required field: userId" });
  }

  // Validation check for missing licensePlate
  if (!licensePlate) {
    return res.status(400).json({ message: "Missing required field: licensePlate" });
  }

   // Validation check for invalid licensePlate (e.g., must be a non-empty string)
   if (typeof licensePlate !== 'string' || licensePlate.trim().length === 0) {
    return res.status(400).json({ message: "Invalid licensePlate: must be a non-empty string" });
  }
   // Validation check for invalid userId (e.g., must be a positive integer)
  if (typeof userId !== 'number' || userId <= 0) {
    return res.status(400).json({ message: "Invalid userId: must be a positive integer" });
  }

  // If validation passes, call the service to register the plate
  LicensePlate.registerPlate({ userId, licensePlate })
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      // If an error occurs in the service, send it back to the client
      utils.writeJson(res, error);
    });
};

