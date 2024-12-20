'use strict';


/**
 * Add a new spot owner
 * FR15: The system administrator must be able to add a spot owner to the system
 * 
 * body SpotOwner Spot owner object to add
 * no response value expected for this operation
 * @param {Object} body - Spot owner object to add.
 * @property {number} body.id - Unique identifier for the spot owner. Must be a positive integer.
 * @property {string} body.idNumber - Identification number for the spot owner. Must be a non-empty string.
 * @property {string} body.name - Full name of the spot owner. Must be a non-empty string.
 * @property {string} body.email - Email address of the spot owner. Must be a valid non-empty string.
 * @property {string} body.phone - Contact number of the spot owner. Must be present.
 * @property {Array} body.spots - List of spots owned by the user. Must be present.
 * 
 * @returns {Promise} Resolves if addition is successful, rejects with an error otherwise.
 */
exports.addSpotOwner = function(body) {
  return new Promise((resolve, reject) =>{

    //Ένας ήδη καταχωρημένος ιδιοκτήτης θέσεων έχει id, ταυτότητα, ονοματεπώνυμο, email, τηλέφωνο, λίστα με δικές του θέσεις.
    var existingSpotOwners = {
      "id":1,
      "idNumber": "AK1234", 
      "name":"John Doe", 
      "email":"johhdoe@gmail.com",
      "phone":"1234567890",
      "spots":[] 
    };
     
    //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.id || body.id < 0) {
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //αν το idNumber έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.idNumber || typeof body.idNumber !== "string") {
      const error = new Error("Invalid idNumber: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //αν το name έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.name || typeof body.name !== "string") {  
      const error = new Error("Invalid name: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //αν το email έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.email || typeof body.email !== "string") {
      const error = new Error("Invalid email: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
    
    //αν το phone δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.phone) {
      const error = new Error("No phone.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //αν το spots δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.spots) {
      const error = new Error("No spots.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    resolve();
    });

}