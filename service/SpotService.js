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

    // Τα δεδομένα των ήδη καταχωρημένων θέσεων μέσα στο σύστημα
    var existingSpots = {
        "address": "Navarinou 18",
        "id": 15,
        "type": "Garage",
        "chargerAvailability": false
      };

    // Το address πρέπει να είναι string
    if (!body.address) {
      //αν το address έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid address: must be a string.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }
    
    //Το id πρέπει να είναι μη αρνητικός ακέραιος αριθμός
    if (!body.id || body.id < 0) {
      //αν το id έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid id: must be a positive integer.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //Το type πρέπει να ισούται με "Garage" ή "Open" ή "Underground"
    if (!["Garage", "Open", "Underground"].includes(body.type)) {
      //αν το type έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid type: must be one of 'Garage', 'Open', or 'Underground'.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    //Το chargerAvailability πρέπει να είναι boolean
    if (typeof body.chargerAvailability !== 'boolean') {
      //αν το chargerAvailability έχει μη έγκυρη τιμή τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Invalid chargerAvailability: must be a boolean.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    // Έλεγχος αν υπάρχει ήδη το spot , δηλαδή γίνεται έλεγχος για διπλότυπη θέση
    // Αν όλα τα attributes του existingSpots ισούται ένα προς ένα με όλα τα attributes του spot που θέλω να φτιάξω,
    // τότε θέλω να δημιουργήσω μια διπλότυπη θέση. Άρα, έχω σφάλμα
    const spotExists = existingSpots.id === body.id &&
               existingSpots.address === body.address &&
               existingSpots.type === body.type &&
               existingSpots.chargerAvailability === body.chargerAvailability;
    
    if (spotExists) {
      //Αν βρεθεί διπλότυπη θέση τότε έχω σφάλμα με κωδικό σφάλματος 400
      const error = new Error("Spot already exists: a spot with the same attributes already exists.");
      error.response = { statusCode: 400 };
      reject(error);
      return;
    }

    // Η θέση έχει περάσει όλους τους ελέγχους και μπορώ να την προσθέσω
    // Δεν το κάνω, καθώς η συνάρτηση είναι dummy

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
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


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
exports.searchSpot = function (address, type, charger) {
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

