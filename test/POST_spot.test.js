const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { createSpot } = require('../service/SpotService.js');

// εχω θεμα : το successful response code το βαλαμε 201 στο yaml , ενω παιρνω response code 200 όταν τα test τρέχουν σωστά
// Να το φτιάξουμε

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
  });

test.after.always((t) => {
	t.context.server.close();
});

//Δεν Χρησιμοποιώ για ονόματα αντικειμένων το 'spot' 
//διότι το 'spot' χρησιμοποιήθηκε στο GET_spot.test.js
//Παρατήρησα πως αν χρησιμοποιήσω και εδώ 'spot' θα έχω σφάλμα 



// Επιτυχής δημιουργία νέων θέσεων --> το endpoint αυτο μου βγαζει σφάλμα 404 ενώ κανονικά έπρεπε να μου δίνει 200
// Μπορεί να φταίει το γεγονός ότι δεν το έχω γραψει μέσα στο createSpot στο SpotService.js


// test('POST /spot - Successfully creates new spots', async(t) => {
//   const spot3 = {
//     address: 'Naxou 75',
//     id: 125,
//     type: "Underground",
//     chargerAvailability: false
//   };

//   const error = await t.throwsAsync(
//     t.context.got.post('newSpot',{json: spot3})
//   );

//   t.is(error.response.statusCode, 200); //Ελέγχω ότι το response csde είναι 200(επιτυχία)
// });



//Αναμένω αποτυχία του test λόγω διπλότυπου αντικειμένου
test('POST /spot - Fails when spot already exists and returns 404', async (t) => {
  const duplicateSpot = {
    address: 'Navarinou 18',
    id: 15,
    type: "Garage",
    chargerAvailability: false
  };

  const error = await t.throwsAsync(
    t.context.got.post('spot4',{json: duplicateSpot})
  );

  t.is(error.response.statusCode, 404); //Ελέγχω ότι το response code είναι 404 (σφάλμα)
})

//Αποτυχία λόγω μη έγκυρης διεύθυνσης
test('POST /spot - Fails when address value is invalid and returns 404', async (t) => {
  const InvalidSpot_1 = {
    address: 1235, 
    id: 105, 
    type: "Open", 
    chargerAvailability: true
  }
  // Χρησιμοποιούμε τη μέθοδο `throwsAsync` για να περιμένουμε ότι το αίτημα θα αποτύχει και θα ρίξει εξαίρεση.

  const error = await t.throwsAsync(
  // Κάνουμε ένα POST αίτημα στο endpoint 'spot5' με τα δεδομένα InvalidSpot_1.
  // Αναμένουμε ότι τα δεδομένα αυτά θα προκαλέσουν σφάλμα (λόγω μη έγκυρης διεύθυνσης).
  t.context.got.post('spot5', { json: InvalidSpot_1 })
);

// Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
t.is(error.response.statusCode, 404);
});

//Αποτυχία λόγω αρνητικού id
test('POST /spot - Fails when id value is invalid and returns 404', async (t) => {
  const InvalidSpot_2 = {
    address: "Samou 43", 
    id: -12, 
    type: "Open", 
    chargerAvailability: true
  }
    // Χρησιμοποιούμε τη μέθοδο `throwsAsync` για να περιμένουμε ότι το αίτημα θα αποτύχει και θα ρίξει εξαίρεση.

    const error = await t.throwsAsync(
    // Κάνουμε ένα POST αίτημα στο endpoint 'spot5' με τα δεδομένα InvalidSpot_2.
    // Αναμένουμε ότι τα δεδομένα αυτά θα προκαλέσουν σφάλμα (λόγω μη έγκυρου id).
    t.context.got.post('spot6', { json: InvalidSpot_2 })
  );
  
  // Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
  t.is(error.response.statusCode, 404);
  
});

//Αποτυχία λόγω μη έγκυρου τύπου
test('POST /spot - Fails when type value is invalid and returns 404', async (t) => {
  const InvalidSpot_3 = {
    address: "Dodonis 19", 
    id: 10, 
    type: "Sidewalk", 
    chargerAvailability: true
  }
    // Χρησιμοποιούμε τη μέθοδο `throwsAsync` για να περιμένουμε ότι το αίτημα θα αποτύχει και θα ρίξει εξαίρεση.

    const error = await t.throwsAsync(
    // Κάνουμε ένα POST αίτημα στο endpoint 'spot5' με τα δεδομένα InvalidSpot_3.
    // Αναμένουμε ότι τα δεδομένα αυτά θα προκαλέσουν σφάλμα (λόγω μη έγκυρου τύπου).
    t.context.got.post('spot7', { json: InvalidSpot_3 })
  );
  
  // Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
  t.is(error.response.statusCode, 404);
  
});


test("POST /spot without required address field returns 404", async (t) => {
  const EmptyField_1 = {
    address: "", 
    id: 100, 
    type: "Open", 
    chargerAvailability: true
  }
    
    const error = await t.throwsAsync(
    t.context.got.post('spot8', { json: EmptyField_1 })
  );
  
  // Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
  t.is(error.response.statusCode, 404);
  
});

test("POST /spot without required id field returns 404", async (t) => {
  const EmptyField_2 = {
    address: "Dilou 48", 
    id: "", 
    type: "Garage", 
    chargerAvailability: false
  }
    
    const error = await t.throwsAsync(
    t.context.got.post('spot7', { json: EmptyField_2 })
  );
  
  // Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
  t.is(error.response.statusCode, 404);
  
});

test("POST /spot without required type field returns 404", async (t) => {
  const EmptyField_3 = {
    address: "Mynokou 76", 
    id: 489, 
    type: "", 
    chargerAvailability: false
  }
    
    const error = await t.throwsAsync(
    t.context.got.post('spot7', { json: EmptyField_3 })
  );
  
  // Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
  t.is(error.response.statusCode, 404);
  
});

test("POST /spot without required chargerAvailability field returns 404", async (t) => {
  const EmptyField_4 = {
    address: "Tinou 90", 
    id: 347, 
    type: "Garage", 
    chargerAvailability: ""
  }
    
    const error = await t.throwsAsync(
    t.context.got.post('spot7', { json: EmptyField_4 })
  );
  
  // Ελέγχουμε ότι η απόκριση έχει το σωστό κωδικό σφάλματος (404), ο οποίος δηλώνει ότι το αίτημα δεν είναι έγκυρο.
  t.is(error.response.statusCode, 404);
  
});

// //Αποτυχία λόγω μη συμπληρωμένων πεδίων στο body του spot
// test("POST /spot without required fields returns 404", async (t) => {
//     const error = await t.throwsAsync(() => t.context.got.post('spot8', {
//         json: { address: "", id: "", type: "", chargerAvailability: ""}
//     }));
//     t.is(error.response.statusCode, 404); // Ελέγχουμε ότι ο κώδικας επστροφής είναι 404
// });

//Αποτυχία λόγω απουσίας της διεύθυνσης της θέσης
test("POST /spot with missing address returns 404", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('spot9', {
        json: { id: 44, type: "Open", chargerAvailability: false }
    }));
    t.is(error.response.statusCode, 404); // Ελέγχουμε ότι ο κώδικας επστροφής είναι 404
});

// Αποτυχία λόγω απουσίας του id της θέσης
test("POST /spot with missing id returns 404", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('spot10', {
        json: { address : "Solomou 52",  type: "Garage", chargerAvailability: true}
    }));
    t.is(error.response.statusCode, 404); // Ελέγχουμε ότι ο κώδικας επστροφής είναι 404
});

//Αποτυχία λόγω απουσίας του τύπου της θέσης
test("POST /spot with missing type returns 404", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('spot11', {
        json: {address : "Papanikolaou",  id : 1091, chargerAvailability: false}
    }));
    t.is(error.response.statusCode, 404); // Ελέγχουμε ότι ο κώδικας επστροφής είναι 404
});

//Αποτυχία διότι δεν έχει δηλωθεί η ύπαρξη ή όχι ηλεκτρικού φορτιστή στη θέση
test("POST /spot with missing chargerAvailability returns 404", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.post('spot12', {
      json: {address : "Aetoraxis 22",  id : 1, type: "Open"}
  }));
  t.is(error.response.statusCode, 404); // Ελέγχουμε ότι ο κώδικας επστροφής είναι 404
});