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
    
    // A license plate already registered in the system
    var existingPlates = {
      "licensePlate": "AKH1314", 
      "id": 15, 
    };

    // If the licensePlate is not present in the request body or is an empty string, return an error with status code 400
    if (!body.licensePlate || body.licensePlate === "" ) {
      const error = new Error("license Plate does not exist");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    // If the id has an invalid value, return an error with status code 400
    if (!Number.isInteger(body.id) || body.id < 0) {
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    // If the dummy plate already registered in the system has the same id as the request body but a different
    // license plate name from the request body, the modification of the license plate is successful.
    // If the attributes of the dummy registered plate and the request body match, then the plate is not modified,
    // and its "old" attributes are retained. Finally, if all attributes of the dummy plate differ from those
    // of the request body, a new plate is created and an existing plate is NOT modified.
    const isExactMatch = existingPlates.id === body.id && existingPlates.licensePlate === body.licensePlate;
    if (isExactMatch) {
        const error = new Error("License plate already exists.");
        error.response = { statusCode: 400 };
        reject(error);
        return;
    }
    
    // Allow updating the license plate for an existing ID (Successful license plate modification)
    // Valid update returns response code 200
    const isValidUpdate = existingPlates.id === body.id && existingPlates.licensePlate !== body.licensePlate;
    if (isValidUpdate) {
        resolve();
        return;
    }
    
    // Handle non-existent ID (the plate does not exist in the system)
    // If the plate to be modified is NOT found, return error code 404.
    const isNonExistent = existingPlates.id !== body.id;
    if (isNonExistent) {
        const error = new Error("License plate doesn't exist.");
        error.response = { statusCode: 404 }; 
        reject(error);
        return;
    }
    
    resolve();  // Return the updated plate object
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

    // A license plate already registered in the system
    var existingPlates = {
      "licensePlate": "AKH1314",
      "id": 15, 
    };

    // If the id has an invalid value, return an error with status code 400
    if (!Number.isInteger(body.id) || body.id < 0) {
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
     
    // If the licensePlate is not present in the request body or is an empty string, return an error with status code 400
    if (!body.licensePlate || body.licensePlate === "") {
      const error = new Error("licenseplate does not exist");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
  
    resolve();
    });
};
