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

    // Only if the registered plate has the same id but a different name, update it.
    const isExactMatch = existingPlates.id === body.id && existingPlates.licensePlate === body.licensePlate;
    if (isExactMatch) {
        const error = new Error("License plate already exists.");
        error.response = { statusCode: 400 };
        reject(error);
        return;
    }
    
    // Allow updating the license plate for an existing ID(Successful license plate modification). Returns code 200.
    const isValidUpdate = existingPlates.id === body.id && existingPlates.licensePlate !== body.licensePlate;
    if (isValidUpdate) {
        resolve();
        return;
    }
    
    // Handle non-existent ID. If the plate does not exist in the system, then returns code 404.
    const isNonExistent = existingPlates.id !== body.id;
    if (isNonExistent) {
        const error = new Error("License plate doesn't exist.");
        error.response = { statusCode: 404 }; 
        reject(error);
        return;
    }
    
    resolve();
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

    // If the id has an invalid value, return an error with status code 400.
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
