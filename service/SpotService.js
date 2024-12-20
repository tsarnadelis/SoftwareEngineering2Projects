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

    if (!body.address) { // Έλεγχος αν υπάρχει το address.Το address πρέπει να είναι string.
      const error = new Error("Invalid address: must be a string."); // Το address πρέπει να υπάρχει και να είναι string.
      error.response = { statusCode: 400 }; // Διαφορετικά έχω σφάλμα με κωδικό σφάλματος 400
      reject(error);
      return; // επιστρέφει 400
    }
    
    if (!body.id || body.id < 0) { //Το id πρέπει να υπάρχει και να είναι θετικό
      const error = new Error("Invalid id: must be a positive integer."); //Διαφορετικά, έχω σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό σφάλματος 400
      reject(error);
      return;  // Επιστρέφει 400
    }

    if (!["Garage", "Open", "Underground"].includes(body.type)) {//Το type πρέπει να ισούται με "Garage" ή "Open" ή "Underground"
      const error = new Error("Invalid type: must be one of 'Garage', 'Open', or 'Underground'."); // Αλλιώς έχω σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό σφάλματος 400
      reject(error);
      return;  // Επιστρέφει 400
    } 

    if (typeof body.chargerAvailability !== 'boolean') {  //Το chargerAvailability πρέπει να είναι boolean.
      const error = new Error("Invalid chargerAvailability: must be a boolean."); // Αλλιώς έχω σφάλμα 
      error.response = { statusCode: 400 }; // Με κωδικό σφάλματος 400
      reject(error);
      return;  // Επιστρέφει 400
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

    if (!["Garage", "Open", "Underground"].includes(type)) {//Το type πρέπει να ισούται με "Garage" ή "Open" ή "Underground"
      const error = new Error("Invalid type in query: must be one of 'Garage', 'Open', or 'Underground'."); // Αλλιώς σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό σφάλματος 400
      reject(error);
      return; // Επιστρέφει 400
    }

    if (!id || id < 0) {    //Το id πρέπει να υπάρχει και να είναι μη αρνητικός ακέραιος αριθμός
      const error = new Error("Invalid id in query: must be a positive integer."); // Αλλιώς έχω σφάλμα
      error.response = { statusCode: 400 }; // με κωδικό 400
      reject(error);
      return;  // Επιστρέφει 400
    }

    if (body.address !== address) { // Σύγκριση του query address με το address του body.
      const error = new Error("Address mismatch between query and body."); // Αν είναι διαφορετικά, τότε έχω σφάλμα
      error.response = { statusCode: 400 }; // Με κωδικό 400
      reject(error); 
      return; // Επιστρέφει 400
    }

    if (body.type !== type) { // Σύγκριση του query type με το type του request body.
      const error = new Error("Type mismatch between query and body."); // Αν είναι διαφορετικά, τότε έχω σφάλμα
      error.response = { statusCode: 400 }; // Με κωδικό 400
      reject(error);
      return; // Επιστρέφει 400
    }

    if (body.charger !== charger) { // Σύγκριση του query charger με το charger του request body.
      const error = new Error("Charger mismatch between query and body."); // Αν είναι διαφορετικά, τότε έχω σφάλμα
      error.response = { statusCode: 400 }; // Με κωδικό 400
      reject(error);
      return; // Επιστρέφει 400
    }

    if (body.id !== id) { // Σύγκριση του query id με το id του request body.
      const error = new Error("ID mismatch between query and body."); // Αν είναι διαφορετικά, τότε έχω σφάλμα
      error.response = { statusCode: 400 }; // Με κωδικό 400
      reject(error);
      return; // Επιστρέφει 400
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