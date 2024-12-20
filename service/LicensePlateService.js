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
    
    // Μια ήδη καταχωρημένη πινακίδα μέσα στο σύστημα
    var existingPlates = {
      "licensePlate": "AKH1314", // όνομα πινακίδας
      "id": 15, // το id της πινακίδας
    };

    //αν το licensePlate δεν υπάρχει στο request body ή ισούται με το κενό string τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.licensePlate || body.licensePlate === "" ) {
      const error = new Error("license Plate does not exist");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!Number.isInteger(body.id) || body.id < 0) {
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

   //Αν η dummy πινακίδα που είναι ήδη καταχωρημένη μέσα στο σύστημα έχει ίδιο id με εκείνο του request body και διαφορετικό
   // όνομα πινακίδας με εκείνο του request body, τότε συμβαίνει με επιτυχία η τροποποίηση της πινακίδας. Αν τα γνωρίσματα της 
   // dummy καταχωρημένης πινακίδας και του request body ταυτίζονται , τότε δεν τροποποιώ την πινακίδα αλλά αντίθετα διατηρώ 
   // τα "παλιά" της στοιχεία.Τέλος, αν όλα τα γνωρίσματα της dummy πινακίδας διαφέρουν με τα αντίστοιχα γνωρίσματα του request 
   // body , τότε δημιουργώ μια νέα πινακίδα και ΔΕΝ τροποποιώ μια ήδη υπάρχουσα πινακίδα.
    const isExactMatch = existingPlates.id === body.id && existingPlates.licensePlate === body.licensePlate;
    if (isExactMatch) {
        const error = new Error("License plate already exists.");
        error.response = { statusCode: 400 };
        reject(error);
        return;
    }
    
    // Allow updating the license plate for an existing ID (Επιτυχής τροποποίηση πινακίδας)
    // Valid update returns response code 200
    const isValidUpdate = existingPlates.id === body.id && existingPlates.licensePlate !== body.licensePlate;
    if (isValidUpdate) {
        resolve();
        return;
    }
    
    // Handle non-existent ID (η πινακίδα δεν υπάρχει μέσα στο σύστημα)
    // Αν η πινακίδα που επιθυμώ να τροποποιήσω ΔΕΝ βρεθεί, τότε επιστρέφει κωδικό σφάλματος 404.
    const isNonExistent = existingPlates.id !== body.id;
    if (isNonExistent) {
        const error = new Error("License plate doesn't exist.");
        error.response = { statusCode: 404 }; 
        reject(error);
        return;
    }
    
    resolve();  // Return the updated plate object
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

    // Μια ήδη καταχωρημένη πινακίδα μέσα στο σύστημα
    var existingPlates = {
      "licensePlate": "AKH1314", // το όνομα της πινακίδας
      "id": 15, // το id της πινακίδας
    };

    //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!Number.isInteger(body.id) || body.id < 0) {
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
     
    //αν το licensePlate δεν υπάρχει στο request body ή ισούται με το κενό string τότε έχω σφάλμα με κωδικό σφάλματος 400
    if (!body.licensePlate || body.licensePlate === "") {
      const error = new Error("licenseplate does not exist");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
  
    resolve();
    });
};
