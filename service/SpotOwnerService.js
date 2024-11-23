'use strict';


/**
 * Add a new spot owner
 * FR15: The system administrator must be able to add a spot owner to the system
 *
 * body SpotOwner Spot owner object to add
 * no response value expected for this operation
 **/


exports.addSpotOwner = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
      "id":1,
      "userId": 1,
      "name":"John Doe",
      "email":"johhdoe@gmail.com",
      "phone":"1234567890",
      "spots":[]


    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]); // Resolve with the example data
    } else {
      resolve();
    }
  });
   
}