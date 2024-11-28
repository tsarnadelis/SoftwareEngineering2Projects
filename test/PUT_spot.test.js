const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { modifySpot } = require('../service/SpotService.js');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
  t.context.server.close();
});

// address === η διεύθυνση της θέσης πάρκινγκ
// type === ο τύπος της θέσης πάρκινγκ
// id === το αναγνωριστικό id της θέσης πάρκινγκ

// charger === η διαθεσιμότητα φορτιστή της θέσης πάρκινγκ, 
// δηλώνει την ύπαρξη ή μη φορτιστή ηλεκτρικών οχημάτων στη θέση πάρκιγκ 

//Τεστάρω αν όλα τα attributes που θέλω να τροποποιήσω έχουν έγκυρες τιμές
test('PUT /spot 200 for successful modification of a spot', async (t) => {
    // Σε αυτό το test, οι τιμές των query και των request body parameters ταυτίζονται,
    // επομένως όλοι οι έλεγχοι της modifySpot εκτελούνται με επιτυχία και
    // επιστρέφεται ΚΕΝΟ body
    const { body, statusCode } = await t.context.got.put('spot/15?address=Naxou%2012&type=Open&charger=false', {
      json: { 
        //το id αναγκαστικά μένει ίσο με 15 , αφού θέλω να κάνω modify τη dummy θέση στη συνάρτηση modifySpot
        "address": "Naxou 12", 
        "id": 15, 
        "type": "Open", 
        "charger": false, // Έγκυρη τιμή boolean
      },
    });
  
    // Ελέγχω ότι ο server επιστρέφει τον σωστό status code
    t.is(statusCode, 200);//μου επιστρέφει κωδικό επιτυχίας 200
  
    // Επιβεβαιώνω ότι το body είναι κενό ή undefined
    // διότι σε περίπτωση επιτυχούς τροποποίησης του αντικειμένου spot ΔΕΝ επιστρέφεται body
    t.falsy(body);
  });
  

//Τεστάρω αν το query id ταυτίζεται με το id του request body
test('PUT /spot 400 if query_id !== body_request_id', async (t) => {
    //Σε αυτό το test παρατηρώ ότι query_id = 23 και body_request_id = 2
    //Επομένως, έχω διαφορετικά id και το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/23?address=Navarinou%2020&type=Garage&charger=false', {
        json: {
            "address": "Navarinou 20",
            "id": 2,
            "type": "Garage",
            "charger": false,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το query address ταυτίζεται με το address του request body
test('PUT /spot 400 if query_address !== body_request_address', async (t) => {
    //Σε αυτό το test παρατηρώ ότι query_address = "Navarinou 20" και body_request_address = "Navarinou 56"
    //Επομένως, έχω διαφορετικά address και το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/2?address=Navarinou%2020&type=Garage&charger=false', {
        json: {
            "address": "Navarinou 56",
            "id": 2,
            "type": "Garage",
            "charger": false,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το query type ταυτίζεται με το type του request body
test('PUT /spot 400 if query_type !== body_request_type', async (t) => {
    //Σε αυτό το test παρατηρώ ότι query_type = "Garage" και body_request_type = "Underground"
    //Επομένως, έχω διαφορετικά type και το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/2?address=Navarinou%2020&type=Garage&charger=false', {
        json: {
            "address": "Navarinou 20",
            "id": 2,
            "type": "Underground",
            "charger": false,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το query charger ταυτίζεται με το charger του request body
test('PUT /spot 400 if query_charger !== body_request_charger', async (t) => {
    //Σε αυτό το test παρατηρώ ότι query_charger = true και body_request_charger = false
    //Επομένως, έχω διαφορετικά type και το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/2?address=Navarinou%2020&type=Garage&charger=true', {
        json: {
            "address": "Navarinou 20",
            "id": 2,
            "type": "Garage",
            "charger": false,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το query id ή το id του request body είναι μη έγκυρα
test('PUT /spot 400 for invalid id', async (t) => {
    //Σε αυτό το test παρατηρώ ότι τα δύο id ισούται με -3.
    //Επομένως στην modifySpot , ο έλεγχος θα αποτύχει στο query id.
    //Σε διαφορετική περίπτωση, αν το query id ήταν έγκυρο αλλά το id του request body ήταν μη έγκυρο,
    //τότε στην modifySpot, ο έλεγχος θα αποτύγχανε όταν θα εξετάζονταν η ισότητα των 2 id.
    //Συνεπώς, αυτό το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/-3?address=Navarinou%2020&type=Open&charger=true', {
        json: {
            "address": "Navarinou 20",
            "id": -3,
            "type": "Open",
            "charger": true,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//το address του request body είναι μη έγκυρo
test('PUT /spot 400 for invalid address', async (t) => {
    //Σε αυτό το test παρατηρώ ότι το address του request body ισούται με τον ακέραιο 123.
    //Αντίθετα, το query address ισούται με το string "123".
    //Επομένως στην modifySpot , ο έλεγχος θα αποτύχει όταν θα εξεταστεί η ισότητα των 2 address.
    //Συνεπώς, αυτό το test αποτυχαίνει
    const body = await t.throwsAsync(() =>  t.context.got.put('spot/3?address=123&type=Open&charger=true', {
        json: {
            "address": 123,
            "id": 3,
            "type": "Open",
            "charger": true,
        },
        }));
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν το query type ή το type του request body είναι μη έγκυρα
test('PUT /spot 400 for invalid type', async (t) => {
    //Σε αυτό το test παρατηρώ ότι τα δύο type ισούται με "SideWalk".
    //Άρα, είναι μη έγκυρα αφού δεν ταυτίζονται με "Open" ή "Garage" ή "Underground"
    //Επομένως στην modifySpot , ο έλεγχος θα αποτύχει στο query type.
    //Σε διαφορετική περίπτωση, αν το query type ήταν έγκυρο αλλά το type του request body ήταν μη έγκυρο,
    //τότε στην modifySpot, ο έλεγχος θα αποτύγχανε όταν θα εξετάζονταν η ισότητα των 2 type.
    //Συνεπώς, αυτό το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/5?address=Navarinou%2020&type=SideWalk&charger=true', {
        json: {
            "address": "Navarinou 20",
            "id": 5,
            "type": "SideWalk",
            "charger": true,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//το charger του request body είναι μη έγκυρo
test('PUT /spot 400 for invalid charger', async (t) => {
    //Σε αυτό το test παρατηρώ ότι το charger του request body ισούται με το string "true".
    //Αντίθετα, το query charger ισούται με το boolean true.
    //Επομένως στην modifySpot , ο έλεγχος θα αποτύχει όταν θα εξεταστεί η ισότητα των 2 charger.
    //Συνεπώς, αυτό το test αποτυχαίνει
    const {body} = await t.context.got.put('spot/3?address=Samou%2012&type=Open&charger=true', {
        json: {
            "address": "Samou 12",
            "id": 3,
            "type": "Open",
            "charger": "true",
        },
        });
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστάρω αν τα νέα δεδομένα που εισάγω για να τροποποιήσω μια ήδη υπάρχουσα θέση μέσα στο σύστημα,
//ανήκουν σε μία άλλη καταχωρημένη θέση μέσα στο σύστημα.
//Δηλαδή, τεστάρω αν μετά την τροποποίηση των δεδομένων της θέσης πρόκειται να προκύψει μια διπλότυπη θέση.
test("POST /spot 400 for duplicate Spot", async (t) => {
    //Το test αποτυχαίνει δίοτι τα νέα δεδομένα που θέλω να περάσω σε μια ήδη υπάρχουσα θέση, ανήκουν σε μία άλλη καταχωρημένη θέση.
    //Ειδικότερα, ο έλεγχος αφορά μόνο τα δεδομένα του request body,
    //διότι θεωρώ πως τα query δεδομένα και τα δεδομένα του request body ταυτίζονται.
    //Σε διαφορετική περίπτωση, αν τα query δεδομένα διέφεραν από τα δεδομένα του request body,
    //τότε ο έλεγχος στη modifySpot θα αποτύγχανε στην ισότητα των query και των request body δεδομένων.
    //Επομένως, ο έλεγχος δε έφτανε ποτέ στην εξέταση της διπλότυπης θέσης. 
    const {body} = await t.context.got.put('spot/15?address=Navarinou%2018&type=Garage&charger=false',
      { json: {
       "address": "Navarinou 18",
       "id": 15,
       "type": "Garage",
       "charger": false
     }});
  t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });

//Τεστ για την απουσία του address απο το request body
test('PUT /spot 400 missing address from request body', async (t) => {
    //Σε αυτό το test παρατηρώ ότι address λείπει από το request body. 
    //Για τον λόγο αυτό το test αποτυχαίνει.
    //Επίσης, το test θα αποτύχαινε και αν έλειπαν τα type, id, charger.
    const {body} = await t.context.got.put('spot/23?address=Navarinou%2020&type=Garage&charger=false', {
        json: {
            "id": 23,
            "type": "Garage",
            "charger": false,
        },
        });
    
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});

//Τεστ για μη έγκυρο request body
test('PUT /spot 400 for invalid request body', async (t) => {
    //Το τεστ αποτυχαίνει δίοτι το request body είναι μη έγκυρο
    const body = await t.throwsAsync(() =>
      t.context.got.put('spot/3?address=Navarinou%2012&type=Open&charger=true', {
        json: "Spot Modification"
      })
    );
    t.is(body.response.statusCode, 400);
});

//Δεν έγραψα τεστ για τον έλεγχο της ορθότητας της συνάρτησης modifySpot διότι το θεώρησα υπερβολικό. 