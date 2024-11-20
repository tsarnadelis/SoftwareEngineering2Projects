'use strict';


/**
 * Cancel a specific reservation
 * FR7: The user must be able to manage their reservation in the system
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.deleteReservation = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create a new reservation
 * FR6: The user must be able to reserve a parking spot
 *
 * body Reservation Reservation object to create
 * no response value expected for this operation
 **/
exports.makeReservation = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2024-11-19",
  "duration" : "180",
  "startTime" : "08:00",
  "userId" : 1,
  "spotId" : 1,
  "id" : 1
}, {
  "date" : "2024-11-19",
  "duration" : "180",
  "startTime" : "08:00",
  "userId" : 1,
  "spotId" : 1,
  "id" : 1
    } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    resolve();
  }else{
    resolve();
  }
  });
}


/**
 * Modify a specific reservation
 * FR7: The user must be able to manage their reservation in the system
 *
 * body Reservation Reservation object to update
 * spotId Integer 
 * userId Integer 
 * startTime Date 
 * duration Date 
 * date date 
 * id Integer 
 * no response value expected for this operation
 **/
exports.modifyReservation = function(body,spotId,userId,startTime,duration,date,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

