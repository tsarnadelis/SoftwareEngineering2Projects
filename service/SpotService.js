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

    // Ορίζω τους κανόνες εγκυρότητας για κάθε field της θέσης πάρκινγκ. Το κάνω αυτό για να μειώσω το πλήθος των reject(error)
    const validations = [
      { key: 'address',  rule: (value) => value !== undefined && value !== null && typeof value === 'string' 
        && value.trim() !== '', errorMessage: "Invalid address: must be a string." },  // Η διεύθυνση είναι string
      { key: 'id', rule: (value) => value >= 0 && Number.isInteger(value),  // το id είναι μη αρνητικός ακέραιος αριθμός
        errorMessage: "Invalid id: must be a non-negative integer." },
      { key: 'type', rule: (value) => ["Garage", "Open", "Underground"].includes(value), // ο τύπος μπορεί να πάρει 3 διαφορετικές τιμές
        errorMessage: "Invalid type: must be one of 'Garage', 'Open', or 'Underground'." },
      { key: 'chargerAvailability', rule: (value) => typeof value === 'boolean',  // Η διαθεσιμότητα φορτιστή είναι boolean
        errorMessage: "Invalid chargerAvailability: must be a boolean." }
    ];

    // Έλεγχος για σφάλματα στα fields της θέσης πάρκινγκ
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) { // Αν η τιμή δεν ικανοποιεί τον κανόνα εγκυρότητας (rule), τότε υπάρχει σφάλμα
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 }; // Επιστρέφει κωδικό 400
        reject(error); 
        return;
      }
    }
    
    // Έλεγχος αν υπάρχει ήδη το spot , δηλαδή γίνεται έλεγχος για διπλότυπη θέση.
    // Αν όλα τα attributes του existingSpots ισούται ένα προς ένα με όλα τα attributes του spot που θέλω να φτιάξω,
    // τότε θέλω να δημιουργήσω μια διπλότυπη θέση. Άρα, έχω σφάλμα
    const spotExists = existingSpots.id === body.id &&  
               existingSpots.address === body.address && 
               existingSpots.type === body.type && 
               existingSpots.chargerAvailability === body.chargerAvailability;
          
    if (spotExists) { //Αν βρεθεί διπλότυπη θέση 
      const error = new Error("Spot already exists: a spot with the same attributes already exists."); // έχω σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό 400
      reject(error);
      return;
    }

    resolve();// Η θέση έχει περάσει όλους τους ελέγχους και μπορώ να την προσθέσω. Δεν το κάνω, καθώς η συνάρτηση είναι dummy.
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
      address: "Navarinou 18",  // η διεύθυνση της θέσης
      id: 15, // το id της θέσης
      type: "Garage", // ο τύπος της θέσης
      charger: false, // η διαθεσιμότητα φορτιστή της θέσης 
    };

    //Ορίζω κανόνες εγκυρότητας για το type και το id της θέσης πάρκινγκ. Τα address και charger ελέγχονται από το swagger.
    //Επίσης, ορίζω κανόνες εγκυρότητας για τη σύγκριση της ισότητας των query και body παραμέτρων.
    //Το κάνω αυτό για να μειώσω το πλήθος των reject(error).
    const validations = [
      { condition: () => ["Garage", "Open", "Underground"].includes(type),  // ο τύπος μπορεί να πάρει 3 διαφορετικές τιμές
        errorMessage: "Invalid type in query: must be one of 'Garage', 'Open', or 'Underground'." },
      { condition: () => id && id >= 0, // το id πρέπει να είναι μη αρνητικός ακέραιος αριθμός
        errorMessage: "Invalid id in query: must be a positive integer." },
      { condition: () => body.address === address, // Τα address των query και body πρέπει να ταυτίζονται
        errorMessage: "Address mismatch between query and body." },
      { condition: () => body.type === type, // Τα type των query και body πρέπει να ταυτίζονται
        errorMessage: "Type mismatch between query and body." },
      { condition: () => body.charger === charger, // Τα charger των query και body πρέπει να ταυτίζονται
        errorMessage: "Charger mismatch between query and body." },
      { condition: () => body.id === id, // Τα id των query και body πρέπει να ταυτίζονται
        errorMessage: "ID mismatch between query and body." },
    ];

    // Έλεγχος για σφάλματα με βάση τους παραπάνω κανόνες εγκυρότητας
    for (const { condition, errorMessage } of validations) {
      if (!condition()) { // Αν δεν ικανοποιείται το condition, τότε υπάρχει σφάλμα
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 }; // Επιστρέφει 400
        reject(error); 
        return;
      }
    }

    // Έλεγχος αν τα τροποποιημένα στοιχεία της θέσης ταυτίζονται με τα "παλιά" στοιχεία της θέσης. 
    //Ουσιαστικά, δεν γίνεται τροποποίηση.
    //Δεν ελέγχω τα id του existingSpots και του body διότι θεωρώ εκ των πραγμάτων ότι ισούται μεταξύ τους.
    // Αυτό συμβαίνει διότι κάνω modify μια ήδη υπάρχουσα θέση , άρα το id δεν αλλάζει κατά το modification.
    // Αν άλλαζε το id τότε θα έκανα create μια νέα θέση. 
    // Αντίστοιχος έλεγχος έγινε και στο PUT /licensePlate.
    const spotExists = existingSpots.address === body.address &&
    existingSpots.type === body.type &&
    existingSpots.charger === body.charger;

    if (spotExists) { //Έλεγχος αν τα τροποποιημένα στοιχεία της θέσης ταυτίζονται με τα "παλιά" της στοιχεία 
      const error = new Error("Spot already exists: a spot with the same attributes already exists."); // Αν ναι , τότε σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό 400
      reject(error);
      return;
    }

    resolve();// Η θέση έχει περάσει όλους τους ελέγχους και μπορώ να την τροποποιήσω. Δεν το κάνω, καθώς η συνάρτηση είναι dummy.
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