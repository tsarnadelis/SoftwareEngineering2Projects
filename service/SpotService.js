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
        "address": "Navarinou 18",
        "id": 15,
        "type": "Garage",
        "chargerAvailability": false
      };

    if (!body.address) { // Το address πρέπει να είναι string. Διαφορετικά έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid address: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
    
    if (!body.id || body.id < 0) { //Το id πρέπει να είναι μη αρνητικός ακέραιος αριθμός. Διαφορετικά, έχω κωδικό σφάλματος 400
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!["Garage", "Open", "Underground"].includes(body.type)) {//Το type πρέπει να ισούται με "Garage" ή "Open" ή "Underground"
      const error = new Error("Invalid type: must be one of 'Garage', 'Open', or 'Underground'.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (typeof body.chargerAvailability !== 'boolean') {  //Το chargerAvailability πρέπει να είναι boolean.
      const error = new Error("Invalid chargerAvailability: must be a boolean.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    const spotExists = existingSpots.id === body.id &&  // Έλεγχος αν υπάρχει ήδη το spot. (Έλεγχος για διπλότυπη θέση)
               existingSpots.address === body.address &&
               existingSpots.type === body.type &&
               existingSpots.chargerAvailability === body.chargerAvailability;
          
    if (spotExists) { //Αν βρεθεί διπλότυπη θέση τότε έχω σφάλμα με κωδικό σφάλματος 400 
      const error = new Error("Spot already exists: a spot with the same attributes already exists.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    resolve();
  });
};


/**
 * Retrieve all available parking spots
 * FR1: The user must be able to view all available parking spots
 *
 * returns List
 **/
exports.getSpots = function () {
  return new Promise(function (resolve, reject) {

    var examples = {};

    examples['application/json'] = [{
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

      resolve();
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
      address: "Navarinou 18",
      id: 15,
      type: "Garage",
      charger: false,
    };

    if (!["Garage", "Open", "Underground"].includes(type)) {//Το type πρέπει να ισούται με "Garage" ή "Open" ή "Underground"
      const error = new Error("Invalid type in query: must be one of 'Garage', 'Open', or 'Underground'.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (!id || id < 0) {    //Το id πρέπει να είναι μη αρνητικός ακέραιος αριθμός
      const error = new Error("Invalid id in query: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (body.address !== address) { // Σύγκριση query παραμέτρου με το αντίστοιχο request body attribute.
      const error = new Error("Address mismatch between query and body.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (body.type !== type) { // Σύγκριση query παραμέτρου με το αντίστοιχο request body attribute.
      const error = new Error("Type mismatch between query and body.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (body.charger !== charger) { // Σύγκριση query παραμέτρου με το αντίστοιχο request body attribute.
      const error = new Error("Charger mismatch between query and body.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    if (body.id !== id) { // Σύγκριση query παραμέτρου με το αντίστοιχο request body attribute.
      const error = new Error("ID mismatch between query and body.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    const spotExists = existingSpots.address === body.address &&
    existingSpots.type === body.type && 
    existingSpots.charger === body.charger;

    if (spotExists) { //Έλεγχος αν τα τροποποιημένα στοιχεία της θέσης ταυτίζονται με τα "παλιά" της στοιχεία 
      const error = new Error("Spot already exists: a spot with the same attributes already exists.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    resolve();
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

    resolve();
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

    examples['application/json'] = [ {
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

    if (address === "address" || type === "type" || charger === true) {
      resolve(examples[Object.keys(examples)[0]]);
    }

    else {

      resolve({
        status: 404,
        message: "No matching parking spots found.",
      })
      
    }
  });
}