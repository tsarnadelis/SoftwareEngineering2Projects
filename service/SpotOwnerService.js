'use strict';


/**
 * Add a new spot owner
 * FR15: The system administrator must be able to add a spot owner to the system
 *
 * body SpotOwner Spot owner object to add
 * no response value expected for this operation
 **/
exports.addSpotOwner = function(body) {
  return new Promise((resolve, reject) => {
     
    if (!body.id || body.id < 0) {
      const error = new Error("Invalid id: must be a positive integer.");     // id must be non negative integer 
      error.response = { statusCode: 400 };    // if id is invalid then returns 400
      reject(error);   // reject the error
      return; 
    };

    if (!body.idNumber || typeof body.idNumber !== "string") {
      const error = new Error("Invalid idNumber: must be a string.");   // id number must be string
      error.response = { statusCode: 400 };    // if idNumber is invalid then returns 400
      reject(error);   // reject the error
      return; 
    };

    if (!body.name || typeof body.name !== "string") {
      const error = new Error("Invalid name: must be a string.");   // name must be string
      error.response = { statusCode: 400 };   // if name is invalid then returns 400
      reject(error);  // reject the error
      return; 
    };

    if (!body.email || typeof body.email !== "string") {
      const error = new Error("Invalid email: must be a string.");   // email must be string
      error.response = { statusCode: 400 };    // if email is invalid then returns 400
      reject(error);  // reject the error 
      return; 
    };
    
    if (!body.phone) {
      const error = new Error("No phone.");  // phone must exists in SpotOwner's data
      error.response = { statusCode: 400 };  // if phone is non - existent then returns 400
      reject(error);  // reject the error 
      return; 
    };

    if (!body.spots) {
      const error = new Error("No spots.");   // Spots must exists in SpotOwner's data
      error.response = { statusCode: 400 };   // if the spot's list is non - existent then returns 400
      reject(error);  // reject the error
      return; 
    };

    resolve();
    });
}