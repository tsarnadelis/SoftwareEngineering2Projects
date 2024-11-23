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
  }
  else{
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
    var exampleReservation = {
      date: "2024-11-19",
      duration: "2024-11-19T11:00:00Z",
      startTime: "2024-11-19T08:00:00Z",
      userId: 1,
      spotId: 1,
      id: 1
    };
  
    if(typeof date !== 'date'){
      const error = new Error('Invalid type in query. Must be date');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(typeof duration !== 'date'){
      const error = new Error('Duration must be datetime');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(typeof startTime !== 'date'){
      const error = new Error('Start time must be datetime');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(!id || id < 0){
      const error = new Error('Invalid id');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(!userId || userId < 0){
      const error = new Error('Invalid userId');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(!spotId || spotId < 0){
      const error = new Error('Invalid spotId');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(!body || typeof body !== 'object'){
      const error = new Error('Invalid request body');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(body.id !== id){
      const error = new Error('ID does not match the reservation ID');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(body.userId !== userId){
      const error = new Error('User ID does not match the reservation user ID');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    if(body.spotId !== spotId){
      const error = new Error('Spot ID does not match the reservation spot ID');
      error.response = {statusCode: 400};
      reject(error);
      return;
    }
    resolve();
  });
}

