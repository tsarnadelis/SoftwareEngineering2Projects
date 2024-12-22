'use strict';


/**
 * Add a new spot owner
 * FR15: The system administrator must be able to add a spot owner to the system
 *
 * body SpotOwner Spot owner object to add
 * no response value expected for this operation
 **/


exports.addSpotOwner = function(body) {
  return new Promise((resolve, reject) =>{
   
    if (!body.id || body.id < 0) {
      //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.idNumber || typeof body.idNumber !== "string") {
      //αν το idNumber έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid idNumber: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.name || typeof body.name !== "string") {  
      //αν το name έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid name: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.email || typeof body.email !== "string") {

      //αν το email έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid email: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
    
    if (!body.phone) {

      //αν το phone δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("No phone.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!body.spots) {

      //αν το spots δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("No spots.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    resolve();
    });

}