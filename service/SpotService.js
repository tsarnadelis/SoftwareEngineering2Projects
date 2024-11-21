'use strict';


/**
 * Add a new parking spot
 * FR12: The spot owner must be able to add a new parking spot to the system
 *
 * body ParkingSpot 
 * no response value expected for this operation
 **/
exports.createSpot = function(body) {
  return new Promise(function(resolve, reject) {
    //Έλεγχος αν το body είναι ορισμένο και περιέχει δεδομένα
    if (!body || typeof body != 'object') {
      reject(new Error("Invalid input: body must be a non-empty object"));
      return;
    }
    
    //Έλεγχος για τα απαιτούμενα γνωρίσματα του body
    const requiredAttributes = ['address', 'id', 'type', 'chargerAvailability'];
    for (const attribute of requiredAttributes) {
      if (!body.hasOwnProperty(attribute)) {
        reject(new Error(`Missing required attribute: ${attribute}`));
        return;
      }
    }
    
    //έλεγχος των τιμών των γνωρισμάτων του body

    //Η θέση πρέπει να έχει διεύθυνση
    if (typeof body.address !== 'string' || body.address.trim() === '') {
      reject(new Error("Invalid address: must be a non-empty string"));
      return;
    }
 
    //Η θέση πρέπει να έχει ακέραιο και μη αρνητικό id
    if (typeof body.id !== 'number' || body.id < 0 || !Number.isInteger(body.id)) {
      reject(new Error("Invalid id: must be a non-negative integer"));
      return;
    }

    //Η θέση πρέπει να έχει τύπο 'Open' ή 'Garage' ή 'Underground'
    const spot_types = ["Open", "Garage", "Underground"]
    if (typeof body.type !== 'string' || (body.type !== spot_types[0] && body.type !== spot_types[1] && body.type !== spot_types[2])) {
      reject(new Error("Invalid type: must be 'Open' or 'Garage' or 'Underground'"));
      return;
    }

    //Στη θέση πρέπει να δηλώνεται η ύπαρξη ή όχι φορτιστή ηλεκτρικών οχημάτων
    if (typeof body.chargerAvailability !== 'boolean') {
      reject(new Error("Invalid chargerAvailability: must be a boolean"));
      return;
    }

    //Προσομοίωση με dummy "αποθηκευμένα" δεδομένα
    const existingSpots = {address: "Navarinou 18", id: 15, type: "Garage", chargerAvailability: false};

    //Έλεγχος αν η θέση(δηλ. το αντικείμενο spot) που πρόκειται να δημιουργήσω υπάρχει ήδη στο σύστημα
    const spotExists = existingSpots.some(spot => spot.address === body.address && spot.type === body.type && 
      spot.chargerAvailability === body.chargerAvailability);
    if (spotExists) { //Ο έλεγχος γίνεται με βάση τη διεύθυνση, τον τύπο , τη διαθεσιμότητα φορτιστή
      //Θεώρησα πως αν έχουμε 2 θέσεις με διαφορετικά id και τα υπόλοιπα γνωρίσματά τους ίδια , τότε έχουμε ουσιατικά μια διπλότυπη θέση.
      //Δηλαδή έχουμε σφάλμα. Επίσης, θεώρησα αχρείαστο να συγκρίνω τα id 2 θέσεων διότι η POST σε κάθε νέο αντικείμενο spot που δημιουργεί,
      //του δίνει διαφορετικό id.
      reject(new Error("Spot already exists: a spot with the same id or the same address already exists"));
      return;
    }

    //Αν δεν παρουσιαστεί σφάλμα σε κάποιο από τα παραπάνω, τότε δημιουργείται η θέση
    resolve();
  });
}


/**
 * Retrieve all available parking spots
 * FR1: The user must be able to view all available parking spots
 *
 * returns List
 **/
exports.getSpots = function() {
  return new Promise(function(resolve, reject) {
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
exports.modifySpot = function(body,address,type,charger,id) {
  return new Promise(function(resolve, reject) {
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
exports.removeSpot = function(id) {
  return new Promise(function(resolve, reject) {
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
  return new Promise(function(resolve, reject) {
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
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

