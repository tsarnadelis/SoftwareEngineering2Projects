const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { createSpot } = require('../service/SpotService.js'); 

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

// address === η διεύθυνση της θέσης πάρκινγκ
// type === ο τύπος της θέσης πάρκινγκ
// id === το αναγνωριστικό id της θέσης πάρκινγκ

// chargerAvailability === η διαθεσιμότητα φορτιστή της θέσης πάρκινγκ, 
// δηλώνει την ύπαρξη ή μη φορτιστή ηλεκτρικών οχημάτων στη θέση πάρκιγκ 

//Τεστάρω αν έχω συμπληρώσει όλα τα attributes του spot που θέλω να δημιουργήσω
test("POST /spot 400 without completing the required fields of spot", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.post("spot", {
    //Όλα τα attributes του spot πρέπει υποχρεωτικά να έχουν τιμη
      json: { address: "", id: "", type: "", chargerAvailability: "" }
  }));
  t.is(error.response.statusCode, 400); //Το test αποτυχαίνει και μου επιστρέφει κωδικό 400
});

//Τεστάρω αν όλα τα attributes του spot που θέλω να δημιουργήσω έχουν έγκυρες τιμές
test("POST /spot 400 with invalid values in all fields of spot", async(t) => {
  //Το test αποτυχαίνει διότι το address ισόυται με integer, το id ισούται με string
  // το type ισούται με μη έγκυρο τύπο parking, το chargerAvailability δεν είναι boolean
  const error = await t.throwsAsync(() => t.context.got.post("spot", {
    json: {address: 573, id:"Thessaloniki", type: "Stadium", chargerAvailability: "Neutral"}
  }));
  t.is(error.response.statusCode, 400);//Το test αποτυχαίνει και μου επιστρέφει κωδικό 400
});

//Τεστάρω την επιτυχή δημιουργία ενός αντικειμένου spot
test("POST /spot 200 for successful creation of a spot", async (t) => {
  // Ελέγχω αν τα δεδομένα του spot που θέλω να δημιουργήσω είναι έγκυρα.
  // Ελέγχω αν τα δεδομένα του spot που θέλω να δημιουργήσω ταυτίζονται με τα δεδομένα κάποιου ήδη
  // καταχωρημένου spot.
  const { body , statusCode } = await t.context.got.post("spot",
     { json: {
      "address": "Navarinou 45",
      "id": 24,
      "type": "Underground",
      "chargerAvailability": false
    }});
  t.is(statusCode, 200); // Οι έλεγχοι μέσα στη createSpot ολοκληρώνονται με επιτυχία και μου επιστρέφεται κωδικός επιτυχίας 200

});

//Τεστάρω αν το id του spot είναι μη αρνητικός αριθμός
test("POST /spot 400 if id is a negative integer", async (t) => {
  //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό
  const { body } = await t.context.got.post("spot",
    { json: {
     "address": "Navarinou 45",
     "id": -4,
     "type": "Underground",
     "chargerAvailability": false
   }});
  t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το id του spot είναι string
test("POST /spot 400 if id is a string", async (t) => {
  //Το test αποτυχαίνει διότι το id ισόυται με string
  const  body  = await t.throwsAsync(() => t.context.got.post("spot",
    { json: {
     "address": "Navarinou 45",
     "id": "Athens",
     "type": "Underground",
     "chargerAvailability": false
   }}));
t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το address του spot είναι string
test("POST /spot 400 for invalid address", async (t) => {
  //Το test αποτυχαίνει διότι το address ισούται με αριθμό
  const body = await t.throwsAsync(() => t.context.got.post("spot",
      { json: {
       "address": 2310,
       "id": 24,
       "type": "Underground",
       "chargerAvailability": false
     }}));
  t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το type του spot είναι "Open" ή "Garage" ή "Underground"
test("POST /spot 400 for invalid type", async (t) => {
  //Το test αποτυχαίνει διότι το type ισόυται με μη έγκυρο τύπο θέσης
  const {body} = await t.context.got.post("spot",
    { json: {
     "address": "Navarinou 45",
     "id": 24,
     "type": "SideWalk",
     "chargerAvailability": false
   }});
t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το chargerAvailability του spot είναι boolean
test("POST /spot 400 for invalid chargerAvailability", async (t) => {
  //Το test αποτυχαίνει διότι το chargerAvailability ισόυται με αριθμό
  const body = await t.throwsAsync(() => t.context.got.post("spot",
    { json: {
     "address": "Navarinou 45",
     "id": 24,
     "type": "Underground",
     "chargerAvailability": 75
   }}));
t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν η θέση που θέλω να δημιουργήσω υπάρχει ήδη μέσα στο σύστημα.
//Δηλαδή, τεστάρω αν έχω διπλότυπη θέση
test("POST /spot 400 for duplicate Spot", async (t) => {
  //Το test αποτυχαίνει δίοτι τα δεδομένα της νέας θέσης που θέλω να δημιουργήσω, ανήκουν σε μία ήδη καταχωρημένη θέση
  const {body} = await t.context.got.post("spot",
    { json: {
     "address": "Navarinou 18",
     "id": 15,
     "type": "Garage",
     "chargerAvailability": false
   }});
t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});


//Ακολουθούν tests με τα οποία ελέγχω την ορθότητα της συνάρτησης createSpot του SpotService.js


//Τεστάρω τη συνάρτηση createSpot για τη δημιουργία διπλότυπου spot
test("POST /spot 400 createSpot testing for duplicate spot", async (t) => {
  //Το test αποτυχαίνει διότι τα δεδομένα του νέου spot (δηλ. του duplicateSpot) 
  // ανήκουν σε ένα ήδη καταχωρημένο spot 
  const duplicateSpot = await t.throwsAsync(() =>
    createSpot({
      "address": "Navarinou 18", 
      "id": 15, 
      "type": "Garage", 
      "chargerAvailability": false
    })
  );
  t.is(duplicateSpot.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω τη συνάρτηση createSpot για αρνητικό id του spot
test("POST /spot 400 createSpot testing for invalid id", async (t) => {
  //Το test αποτυχαίνει διότι το id είναι αρνητικός αριθμός
  const invalid_id = await t.throwsAsync(() =>
    createSpot({
      "address": "Navarinou 18", 
      "id": -38, 
      "type": "Garage", 
      "chargerAvailability": false
    })
  );
  t.is(invalid_id.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω τη συνάρτηση createSpot για μη έγκυρη address του spot
test("POST /spot 400 createSpot testing for invalid address", async (t) => {
  //Το test αποτυχαίνει διότι το address δεν είναι string.
  const invalid_address = await t.throwsAsync(() =>
    createSpot({
      "address": false, 
      "id": 15, 
      "type": "Garage", 
      "chargerAvailability": false
    })
  );
  t.is(invalid_address.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω τη συνάρτηση createSpot για μη έγκυρο type του spot
test("POST /spot 400 createSpot testing for invalid type", async (t) => {
  //Το test αποτυχαίνει διότι το type δεν ισούται με αποδεκτό τύπο θέσης πάρκινγκ
  const invalid_type = await t.throwsAsync(() =>
    createSpot({
      "address": "Navarinou 18", 
      "id": 15, 
      "type": 51, 
      "chargerAvailability": false
    })
  );
  t.is(invalid_type.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω τη συνάρτηση createSpot για μη έγκυρο chargerAvailability του spot
test("POST /spot 400 createSpot testing for invalid chargerAvailability", async (t) => {
  //Το test αποτυχαίνει διότι το chargerAvailability δεν είναι boolean
  const invalid_charger = await t.throwsAsync(() =>
    createSpot({
      "address": "Navarinou 18", 
      "id": 15, 
      "type": "Garage", 
      "chargerAvailability": "false"
    })
  );
  t.is(invalid_charger.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});
