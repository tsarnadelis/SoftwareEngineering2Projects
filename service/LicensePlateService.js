'use strict';


/**
 * Modify vehicle's license plate
 * FR5: The user must be able to modify their vehicle's license plate in the system
 *
 * body LicensePlate License plate object to update
 * no response value expected for this operation
 **/

let mockDatabase = {
  1: { licensePlate: "AKH1314", userId: 1 }, // User 1 has license plate "AKH1314"
   
};
exports.modifyPlate = function(body) {
  return new Promise(function(resolve, reject) {
    const { userId, licensePlate } = body;

    const existingPlate = mockDatabase[userId]; // Check if the plate exists in the mock database
 

    // Update the existing license plate
    existingPlate.licensePlate = licensePlate;
    
    resolve(existingPlate);  // Return the updated plate object
  });
};


/**
 * Register vehicle's license plate
 * FR4: The user must be able to register their vehicle's license plate in the system
 *
 * body LicensePlate License plate to register
 * no response value expected for this operation
 **/
exports.registerPlate = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
      "licensePlate": "AKH1314",
      "userId": 1
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]); // Resolve with the example data
    } else {
      resolve();
    }
  });
   
}
