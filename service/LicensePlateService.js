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
    
    /**A license plate already registered in the system **/
    var existingPlates = {
      "licensePlate": "AKH1314", 
      "id": 15, 
    };

    const validations = [
      { key: 'licensePlate', rule: (value) => value && value !== "", errorMessage: "license Plate does not exist" },
      { key: 'id', rule: (value) => Number.isInteger(value) && value >= 0, errorMessage: "Invalid id: must be a positive integer." }
    ];

    // Loop through validations
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) {
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 };
        reject(error); // Reject with the appropriate error message and status code
        return;
      }
    }

    /** Check if the provided id and licensePlate match exactly with any existing registration. **/
    const isExactMatch = existingPlates.id === body.id && existingPlates.licensePlate === body.licensePlate;

    /** Implement the check */
    if (isExactMatch) {
        const error = new Error("License plate already exists.");
        error.response = { statusCode: 400 };
        reject(error);
        return;
    }
    
    /** Allow updating the license plate for an existing ID. Returns response code 200 **/
    const isValidUpdate = existingPlates.id === body.id && existingPlates.licensePlate !== body.licensePlate;

    /** Implement the check */
    if (isValidUpdate) {
        resolve();
        return;
    }
    
    /** Handle non-existent ID (the plate does not exist in the system).Return error code 404. **/
    const isNonExistent = existingPlates.id !== body.id;

    /*Implement check*/
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
    // Define validation rules for each field
    const validations = [
      { key: 'id', rule: (value) => Number.isInteger(value) && value >= 0, errorMessage: 'Invalid id: must be a positive integer.' },
      { key: 'licensePlate', rule: (value) => value && value !== "", errorMessage: 'licenseplate does not exist' }
    ];

    // Loop through validations
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) {
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 };
        reject(error); // Reject with the appropriate error message and status code
        return;
      }
    }

    resolve(); // All validations passed
  });
};

