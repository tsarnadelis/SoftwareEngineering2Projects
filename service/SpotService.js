'use strict';


/**
 * Add a new parking spot
 * FR12: The spot owner must be able to add a new parking spot to the system
 *
 * body ParkingSpot 
 * no response value expected for this operation
 **/
exports.createSpot = function (body) {
  return new Promise((resolve, reject) => {

    var existingSpots = { // Τα δεδομένα των ήδη καταχωρημένων θέσεων μέσα στο σύστημα
        "address": "Navarinou 18",  // η διεύθυνση της θέσης
        "id": 15,  // το id της θέσης
        "type": "Garage",  // ο τύπος της θέσης
        "chargerAvailability": false  // η διαθεσιμότητα φορτιστή της θέσης
      };

    // Define validation rules for each field
    const validations = [
      { key: 'address', rule: (value) => typeof value === 'string', 
        errorMessage: "Invalid address: must be a string." },
      { key: 'id', rule: (value) => value >= 0 && Number.isInteger(value), 
        errorMessage: "Invalid id: must be a positive integer." },
      { key: 'type', rule: (value) => ["Garage", "Open", "Underground"].includes(value), 
        errorMessage: "Invalid type: must be one of 'Garage', 'Open', or 'Underground'." },
      { key: 'chargerAvailability', rule: (value) => typeof value === 'boolean', 
        errorMessage: "Invalid chargerAvailability: must be a boolean." }
    ];

    // Loop through validations and check for errors
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) {
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 };
        reject(error); // Reject with the appropriate error message and status code
        return;
      }
    }
    
    const spotExists = existingSpots.id === body.id &&  // Έλεγχος αν υπάρχει ήδη το spot. Ειδικότερα, ελέγχω την ισότητα των id
               existingSpots.address === body.address && // τσεκάρω την ισότητα των διευθύνσεων
               existingSpots.type === body.type && // τσεκάρω την ισότητα των τύπων 
               existingSpots.chargerAvailability === body.chargerAvailability; // και τέλος τσεκάρω τη διαθεσιμότητα φορτιστή
          
    if (spotExists) { //Αν βρεθεί διπλότυπη θέση 
      const error = new Error("Spot already exists: a spot with the same attributes already exists."); // έχω σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό 400
      reject(error);
      return; // Επιστρέφει 400
    }

    resolve();  // Δημιουργεί τη θέση πάρκινγκ.
  });
};


/**
 * Retrieve all available parking spots
 * FR1: The user must be able to view all available parking spots
 *
 * returns List
 **/
exports.getSpots = function () {
  return new Promise(function (resolve, /**reject*/) { // reject is unused

    var examples = {};

    examples['application/json'] = [{ // dummy δεδομένα θέσεων
      "address": "address",
      "id": 0,
      "type": "type",
      "chargerAvailability": true
    }, {
      "address": "address",
      "id": 0,
      "type": "type",
      "chargerAvailability": true
    }];

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {

      resolve(); // Eπιστρέφει όλες τις διαθέσιμες θέσεις μέσα στο σύστημα.
    }
  });
}


/**
 * Modify the information of a specific parking spot
 * FR13: The spot owner must be able to modify the information of their spots
 *
 * body ParkingSpot Parking spot object to update
 * address String 
 * type String 
 * charger Boolean 
 * id Integer 
 * no response value expected for this operation
 **/
exports.modifySpot = function (body, address, type, charger, id) {
  return new Promise((resolve, reject) => {

    var existingSpots = { // Τα δεδομένα των ήδη καταχωρημένων θέσεων μέσα στο σύστημα
      address: "Navarinou 18",  // η διεύθυνση της θέσης
      id: 15, // το id της θέσης
      type: "Garage", // ο τύπος της θέσης
      charger: false, // η διαθεσιμότητα φορτιστή της θέσης 
    };

    // Define validation rules for the query and body comparison
    const validations = [
      { condition: () => ["Garage", "Open", "Underground"].includes(type), 
        errorMessage: "Invalid type in query: must be one of 'Garage', 'Open', or 'Underground'." },
      { condition: () => id && id >= 0, 
        errorMessage: "Invalid id in query: must be a positive integer." },
      { condition: () => body.address === address, 
        errorMessage: "Address mismatch between query and body." },
      { condition: () => body.type === type, 
        errorMessage: "Type mismatch between query and body." },
      { condition: () => body.charger === charger, 
        errorMessage: "Charger mismatch between query and body." },
      { condition: () => body.id === id, 
        errorMessage: "ID mismatch between query and body." },
    ];

    // Loop through validations and check for errors
    for (const { condition, errorMessage } of validations) {
      if (!condition()) {
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 };
        reject(error); // Reject with the appropriate error message and status code
        return;
      }
    }

    const spotExists = existingSpots.address === body.address && // Ελέγχω αν όντως τροποποίησα την θέση. Τσεκάρω διεύθυνση
    existingSpots.type === body.type &&  // Τσεκάρω τύπο
    existingSpots.charger === body.charger; // Τσεκάρω διαθεσιμότητα φορτιστή

    if (spotExists) { //Έλεγχος αν τα τροποποιημένα στοιχεία της θέσης ταυτίζονται με τα "παλιά" της στοιχεία 
      const error = new Error("Spot already exists: a spot with the same attributes already exists."); // Αν ναι , τότε σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό 400
      reject(error);
      return; // Επιστρέφει 400
    }

    resolve(); // Επιστρέφει τη τροποποιημένη θέση
  });
};


/**
 * Remove a specific parking spot from the system
 * FR14: The spot owner must be able to remove a spot from the system
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.removeSpot = function (id) {
  return new Promise(function (resolve, reject) {

    resolve();  // Διαγράφει τη θέση από το σύστημα
  });
}


/**
 * Search for available parking spots
 * FR2: The user must be able to search for available parking spots in the system
 *
 * address String 
 * type String 
 * charger Boolean 
 * returns List
 **/
exports.searchSpot = function(address,type,charger) {
  return new Promise(function(resolve, /*reject*/) { // remove unused reject

    var examples = {};

    examples['application/json'] = [ { // dummy δεδομένα θέσεων
  "address" : "address",
  "id" : 0,
  "type" : "type",
  "chargerAvailability" : true
}, {
  "address" : "address",
  "id" : 0,
  "type" : "type",
  "chargerAvailability" : true
} ];

    if (address === "address" || type === "type" || charger === true) { // Φίλτρα αναζήτησης θέσης
      resolve(examples[Object.keys(examples)[0]]); // Αν βρεθούν θέσεις τις επιστρέφει
    }

    else {  // Αλλιώς, αν δεν βρεθούν θέσεις

      resolve({
        status: 404,  // Επιστρέφει κωδικό
        message: "No matching parking spots found.",
      })
      
    }
  });
}