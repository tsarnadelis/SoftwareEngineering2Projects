'use strict';


/**
 * Modify vehicle's license plate
 * FR5: The user must be able to modify their vehicle's license plate in the system
 *
 * body LicensePlate License plate object to update
 * no response value expected for this operation
 **/


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
  return new Promise((resolve, reject) => {
    // Check if userId is valid
    var existingPlates = {
      "licenseplate": "AKH1314",
      "id": 15,
      
    };

    
    // If userId is valid, return success (you can add other logic here if needed)
    if (!body.id || body.id < 0) {
      //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
     
    
    if (!body.licenseplate || body.licenseplate === "") {
      //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid lcienseplate : must be a non empty string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
  

    if (typeof body.licenseplate !== "string"){
      //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid lcienseplate : must be a non empty string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
    resolve();
    });



};

