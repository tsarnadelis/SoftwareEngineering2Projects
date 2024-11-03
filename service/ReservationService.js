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
    resolve();
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

