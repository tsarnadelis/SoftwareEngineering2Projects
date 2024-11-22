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
test("POST /spot without completing the required fields returns 400", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.post("spot", {
    //Όλα τα attributes του spot πρέπει υποχρεωτικά να έχουν τιμη
      json: { address: "", id: "", type: "", chargerAvailability: "" }
  }));
  t.is(error.response.statusCode, 400); //Το test αποτυχαίνει και μου επιστρέφει κωδικό 400
});

//Τεστάρω αν όλα τα attributes του spot που θέλω να δημιουργήσω έχουν έγκυρες τιμές
test("POST /spot with invalid values in all fields returns 400", async(t) => {
  //Το test αποτυχαίνει διότι το address ισόυται με integer, το id ισούται με string
  // το type ισούται με μη έγκυρο τύπο parking, το chargerAvailability δεν είναι boolean
  const error = await t.throwsAsync(() => t.context.got.post("spot", {
    json: {address: 573, id:"Thessaloniki", type: "Stadium", chargerAvailability: "Neutral"}
  }));
  t.is(error.response.statusCode, 400);//Το test αποτυχαίνει και μου επιστρέφει κωδικό 400
});

//Τεστάρω την επιτυχή δημιουργία ενός αντικειμένου spot
test("POST /spot 200 - successful creation of a spot", async (t) => {
  // Ελέγχω αν τα δεδομένα του spot που θέλω να δημιουργήσω είναι έγκυρα.
  // Ελέγχω αν τα δεδομένα του spot που θέλω να δημιουργήσω ταυτίζονται με τα δεδομένα κάποιου ήδη
  // καταχωρημένου spot.
  const validatedSpot = await createSpot("Navarinou 45", 24, "Underground", false);
  t.is(validatedSpot.statusCode, 200); // Οι έλεγχοι μέσα στη createSpot ολοκληρώνονται με επιτυχία 
  // και μου επιστρέφεται κωδικός επιτυχίας 200

  // Προχωρώ στην δημιουργία του νέου αντικειμένου spot με την κλήση του POST 
  const response = await t.context.got.post("spot", {
      json: validatedSpot.spot // Χρήση του επαληθευμένου spot από τη createSpot
  });
  t.is(response.statusCode, 200); //Το test πετυχαίνει και μου επιστρέφει κωδικό 200
});

//Τεστάρω αν το id του spot είναι μη αρνητικός αριθμός
test("POST /spot 400 for negative id", async (t) => {
  //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό
  const negative_id = await t.throwsAsync(() =>
    createSpot("Navarinou 18", -1, "Garage", false)
  );
  t.is(negative_id.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το address του spot είναι string
test("POST /spot 400 for invalid address", async (t) => {
  //Το test αποτυχαίνει διότι το address ισόυται με αριθμό
  const invalid_address = await t.throwsAsync(() =>
    createSpot(478, 15, "Garage", false)
  );
  t.is(invalid_address.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το type του spot είναι "Open" ή "Garage" ή "Underground"
test("POST /spot 400 for invalid type", async (t) => {
  //Το test αποτυχαίνει διότι το type ισόυται με τον μη έγκυρο τύπο "SideWalk"
  const invalid_type = await t.throwsAsync(() =>
    createSpot("Navarinou 18", 15, "Sidewalk", false)
  );
  t.is(invalid_type.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το chargerAvailability του spot είναι boolean
test("POST /spot 400 for invalid chargerAvailability", async (t) => {
  //Το test αποτυχαίνει διότι το chargerAvailability δεν είναι boolean
  const invalid_charger = await t.throwsAsync(() =>
    createSpot("Navarinou 18", 15, "Garage", "Neutral")
  );
  t.is(invalid_charger.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω τη δημιουργία διπλότυπου spot
test("POST /spot 400 for duplicate spot", async (t) => {
  //Το test αποτυχαίνει διότι τα δεδομένα του νέου spot (δηλ. του duplicateSpot) 
  // ανήκουν σε ένα ήδη καταχωρημένο spot 
  const duplicateSpot = await t.throwsAsync(() =>
    createSpot("Navarinou 18", 15, "Garage", false)
  );
  t.is(duplicateSpot.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});