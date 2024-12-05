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
 
    // // Η ημερομηνία της κράτησης πρεπει να είναι string (τύπος date)
    // if(typeof date !== 'string'){
    //   const error = new Error('Invalid date.');
    //   //Αν δεν είναι string επιστρέφει κωδικό αποτυχιας 400
    //   error.response = {statusCode: 400};
    //   reject(error);
    //   return;
    // }

    // // Η ώρα λήξης (δηλ. στη περίπτωση μας η διάρκεια) της κράτησης πρεπει να είναι string (τύπος date-time)
    // if(typeof duration !== 'string'){
    //   const error = new Error('Invalid duration.');
    //   //Αν δεν είναι string επιστρέφει κωδικό αποτυχιας 400
    //   error.response = {statusCode: 400};
    //   reject(error);
    //   return;
    // }

    // // Η ώρα έναρξης της κράτησης πρεπει να είναι string (τύπος date-time)
    // if(typeof startTime !== 'string'){
    //   const error = new Error('Invalid Start time.');
    //   //Αν δεν είναι string επιστρέφει κωδικό αποτυχιας 400
    //   error.response = {statusCode: 400};
    //   reject(error);
    //   return;
    // } ****Αφαιρέθηκαν από τον έλεγχο γιατί δεν υπάρχει ανάγκη, ο κωδικας του Swaggerhub καλυπτει αυτον τον ελεγχο****

    // το id της κράτησης πρέπει να είναι μη αρνητικός αριθμός
    if(!id || id < 0){
      const error = new Error('Invalid id');
      //Αν είναι αρνητικό τότε επιστρέφεται κωδικός αποτυχίας 400
      error.response = {statusCode: 400};
      reject(error);
      return;
    }
    
    // το query id πρέπει να ισούται με το request body id
    if(body.id !== id){
      const error = new Error('ID does not match the reservation ID');
      //Διαφορετικά επιστρέφεται κωδικός αποτυχίας 400
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    // το query userId πρέπει να ισούται με το request body userId
    if(body.userId !== userId){
      const error = new Error('User ID does not match the reservation user ID');
      //Διαφορετικά επιστρέφεται κωδικός αποτυχίας 400
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    // το query spotId πρέπει να ισούται με το request body spotId
    if(body.spotId !== spotId){
      const error = new Error('Spot ID does not match the reservation spot ID');
      //Διαφορετικά επιστρέφεται κωδικός αποτυχίας 400
      error.response = {statusCode: 400};
      reject(error);
      return;
    }

    // Επιστρέφει κενό response body σε περίπτωση επιτυχίας
    resolve();
  });
}

