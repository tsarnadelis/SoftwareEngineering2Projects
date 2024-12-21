/**
 * Add a new spot owner
 * FR15: The system administrator must be able to add a spot owner to the system
 *
 * body SpotOwner Spot owner object to add
 * no response value expected for this operation
 **/
exports.addSpotOwner = function(body) {
  return new Promise((resolve, reject) => {

    //idNumber = αριθμός ταυτότητας
    //spots = μια λίστα που περιέχει τις θέσεις που ανήκουν στον ιδιοκτήτη θέσεων.
    
    // Ορίζω κανόνες εγκυρότητας για κάθε field του Ιδιοκτήτη θέσεων.
    //Αν το id δεν είναι θετικός ακέραιος τότε έχω σφάλμα με κωδικό 400.
    //Αν το idNumber δεν είναι string τότε έχω σφάλμα με κωδικό 400. Το ίδιο ισχύει και για τα name και email.
    //Αν το phone δεν υπάρχει στο request body τότε έχω σφάλμα με κωδικό σφάλματος 400. Το ίδιο ισχύει και για το spots.
    const validations = [
      { key: 'id', rule: (value) => value > 0 && Number.isInteger(value), errorMessage: 'Invalid id: must be a positive integer.' },
      { key: 'idNumber', rule: (value) => typeof value === 'string' && value !== undefined 
        && value !== null && value.trim() !== '', errorMessage: 'Invalid idNumber: must be a string.' },
      { key: 'name', rule: (value) => typeof value === 'string' && value !== undefined 
        && value !== null && value.trim() !== '', errorMessage: 'Invalid name: must be a string.' },
      { key: 'email', rule: (value) => typeof value === 'string' && value !== undefined 
        && value !== null && value.trim() !== '', errorMessage: 'Invalid email: must be a string.' },
      { key: 'phone', rule: (value) => value !== undefined, errorMessage: 'No phone.' },
      { key: 'spots', rule: (value) => value !== undefined, errorMessage: 'No spots.' },
    ];

    // Έλεγχος για σφάλματα στα fields του Ιδιοκτήτη θέσεων
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