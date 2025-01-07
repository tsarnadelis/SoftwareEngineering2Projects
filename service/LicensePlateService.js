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
    
    //Ορίζω κανόνες εγκυρότητας για τα fields της πινακίδας.
    //Αν το licensePlate δεν υπάρχει στο request body ή ισούται με το κενό string τότε έχω σφάλμα με κωδικό σφάλματος 400.
    //Επίσης, αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400.
    // Έτσι, μειώνω το πλήθος των reject(error).
    const validations = [
      { key: 'licensePlate', rule: (value) => value && value !== "", errorMessage: "license Plate does not exist" },
      { key: 'id', rule: (value) => Number.isInteger(value) && value > 0, 
        errorMessage: "Invalid id: must be a positive integer." }
    ];

    // Έλεγχος για σφάλματα στα fields της πινακίδας
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) { // Αν η τιμή δεν ικανοποιεί τον κανόνα εγκυρότητας (rule), τότε υπάρχει σφάλμα
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 }; // Επιστρέφει κωδικό 400
        reject(error); 
        return;
      }
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
    const isValidUpdate = existingPlates.id === body.id && existingPlates.licensePlate !== body.licensePlate;
    if (isValidUpdate) {
        resolve(); // This means the update is valid, return 200
        return;
    }
    
    // Handle non-existent ID (η πινακίδα δεν υπάρχει μέσα στο σύστημα)
    const isNonExistent = existingPlates.id !== body.id;
    if (isNonExistent) {
        const error = new Error("License plate doesn't exist."); // Η πινακίδα που επιθυμώ να τροποποιήσω ΔΕΝ βρέθηκε.
        error.response = { statusCode: 404 }; // Επιστρέφει κωδικό σφάλματος 404.
        reject(error);
        return;
    }
    
    resolve();
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
    //Ορίζω κανόνες εγκυρότητας για τα fields της πινακίδας.
    //Αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400.
    //Αν το licensePlate δεν υπάρχει στο request body ή ισούται με το κενό string τότε έχω σφάλμα με κωδικό σφάλματος 400.
    // Έτσι, μειώνω το πλήθος των reject(error).
    const validations = [
      { key: 'id', rule: (value) => Number.isInteger(value) && value > 0, errorMessage: 'Invalid id: must be a positive integer.' },
      { key: 'licensePlate', rule: (value) => value && value !== "", errorMessage: 'licenseplate does not exist' }
    ];

    // Έλεγχος για σφάλματα στα fields της πινακίδας
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) { // Αν η τιμή δεν ικανοποιεί τον κανόνα εγκυρότητας (rule), τότε υπάρχει σφάλμα
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 }; // Επιστρέφει κωδικό 400
        reject(error); 
        return;
      }
    }

    resolve();
  });
};