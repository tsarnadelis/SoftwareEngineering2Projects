'use strict';


/**
 * Cancel a specific reservation
 * FR7: The user must be able to manage their reservation in the system
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.deleteReservation = function(id) {
  return new Promise(function(resolve, _ /*reject*/) {
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
    //Παραθέτω κάποια dummy δεδομένα που αντιστοιχούν σε καταχωρημένες κρατήσεις μέσα στο σύστημα
    examples['application/json'] = [ {
  "date" : "2024-11-19",
  "duration" : "2024-11-19T11:00:00Z",
  "startTime" : "2024-11-19T08:00:00Z",
  "userId" : 1,
  "spotId" : 1,
  "id" : 1
}, {
  "date" : "2024-11-19",
  "duration" : "2024-11-19T11:00:00Z",
  "startTime" : "2024-11-19T08:00:00Z",
  "userId" : 1,
  "spotId" : 1,
  "id" : 1
    } ];

    // Έλεγχος αν υπάρχει ήδη κράτηση με τα ίδια στοιχεία
    // Δηλαδή, γίνεται έλεγχος για διπλότυπη κράτηση
    const duplicate = examples['application/json'].some(reservation =>
      reservation.id === body.id &&
      reservation.date === body.date &&
      reservation.startTime === body.startTime &&
      reservation.duration === body.duration &&
      reservation.spotId === body.spotId &&
      reservation.userId === body.userId
    );

    //Αν βρεθεί διπλότυπη κράτηση
    if (duplicate) {
      const error = new Error("Duplicate reservation detected.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.userId || body.userId < 0) {
      //αν το userId δεν υπάρχει στο request body ή αν είναι αρνητικός αριθμός τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid userId: must be a integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.spotId || body.spotId < 0) {
      //αν το spotId δεν υπάρχει στο request body ή αν είναι αρνητικός αριθμός τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid spotId: must be a integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.duration) {
      //αν το duration δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Duration is missing.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.startTime) {
      //αν το startTime δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Start Time is missing.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
    // Η κράτηση έχει περάσει όλους τους ελέγχους και μπορώ να την προσθέσω
    // Δεν το κάνω, καθώς η συνάρτηση είναι dummy
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
exports.modifyReservation = function(body,spotId,userId,_ /*startTime*/ ,duration ,date,id) {
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
