const http = require('http');
const test = require('ava'); 
const got = require('got'); 
const app = require('../index.js'); 
const { makePayment } = require('../service/PaymentService.js'); 

test.before(async (t) => {
  t.context.server = http.createServer(app); 
  const server = t.context.server.listen(); 
  const { port } = server.address(); 
  t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` }); 
});

test.after.always((t) => {
  t.context.server.close(); 
});

//payment = πληρωμή
//user = ο χρήστης που εκτελεί την πληρωμή
//amount = το χρηματικό ποσό της πληρωμής

//Από το yaml αρχείο παρατηρώ ότι το amount μπορεί να είναι μόνο ακέραιος , αλλιώς έχω σφάλμα.

//Τεστάρω την συνάρτηση makeReservation για την επιτυχή δημιουργία μιας καινούριας πληρωμής
test("makePayment function succeeds with valid data", async (t) => {
    const body = await makePayment({
      id: 123,
      user: {
        id: 456,
        name: "Jane Doe",
        licensePlate: {
          userId: 456,
          licensePlate: "XYZ-7890",
        },
        reservation: [
          {
            id: 789,
            spotId: 321,
            userId: 456,
            startTime: "2024-11-23T10:00:00Z",
            duration: "2024-11-23T12:00:00Z",
            date: "2024-11-23",
          },
        ],
      },
      amount: 150,
    });
    
    t.falsy(body); // το body είναι κενό.
  });
  
test("POST /payment succesfull", async (t) => {
  const {body, statusCode} = await  t.context.got.post('payment', {
    json : {
    id: 123,
    user: {
      id: 456,
      name: "Jane Doe",
      licensePlate: {
        userId: 456,
        licensePlate: "XYZ-7890",
      },
      reservation: [
        {
          id: 789,
          spotId: 321,
          userId: 456,
          startTime: "2024-11-23T10:00:00Z",
          duration: "2024-11-23T12:00:00Z",
          date: "2024-11-23",
        },
      ],
    },
    amount: 150,
  }
});

  t.is(statusCode, 200); //checking that the status code is 200
  t.falsy(body); //confirming that the response body is empty
});

//Τεστ για μη έγκυρα δεδομένα στο payment
test("POST /payment with invalid data returns 400", async (t) => {
  const body = await t.throwsAsync(() => t.context.got.post('payment', {
    json: { id: "invalid", user: "invalid", amount: "invalid" }, // Μη έγκυρα δεδομένα.
  }));
  t.is(body.response.statusCode, 400); // To τεστ αποτυχαίνει και επιστρέφει κωδικό αποτυχίας 400.
});


//Τεστ που αφορά τα μη συμπληρωμένα απαιτούμενα πεδία στο payment
test("POST /payment without required fields returns 400", async (t) => {
  const body = await t.throwsAsync(() =>
    t.context.got.post("payment", {
      json: { id: "", user: "", amount: "" }, // Απουσιάζουν τα απαιτούμενα πεδία.
    })
  );

  t.is(body.response.statusCode, 400); // To τεστ αποτυχαίνει και επιστρέφει κωδικό αποτυχίας 400.
});


//Τεστ για την απουσία του user από το payment 
test("POST /payment with missing user object returns 400", async (t) => {
  const {body} = await  t.context.got.post('payment', {
    json: { id: 123, amount: 150 }, // Λείπει το αντικείμενο του χρήστη που εκτελεί την πληρωμή.
  });
  t.is(body.statusCode, 400);// To τεστ αποτυχαίνει και επιστρέφει κωδικό αποτυχίας 400.
});


//Τεστ για την απουσία του χρηματικού ποσού από το payment
test("POST /payment with missing amount returns 400", async (t) => {
  const {body} = await t.context.got.post("payment", {
      json: {
        id: 123,
        user: {
          id: 456,
          name: "Jane Doe",
          licensePlate: { userId: 456, licensePlate: "XYZ-7890" },
          reservation: [
            {
              id: 789,
              spotId: 321,
              userId: 456,
              startTime: "2024-11-23T10:00:00Z",
              duration: "2024-11-23T12:00:00Z",
              date: "2024-11-23",
            },
          ],
        },
      }, // Λείπει το χρηματικό ποσό.
    })
  t.is(body.statusCode, 400); // To τεστ αποτυχαίνει και επιστρέφει κωδικό αποτυχίας 400.
});


//Τεστ για την απουσία του id της πληρωμής 
test("POST /payment with missing id returns 400", async (t) => {
  const {body} = await t.context.got.post('payment', {
    json: { // Λείπει το id του payment
      user: {
        id: 456,
        name: "Jane Doe",
        licensePlate: { userId: 456, licensePlate: "XYZ-7890" },
        reservation: [
          {
            id: 789,
            spotId: 321,
            userId: 456,
            startTime: "2024-11-23T10:00:00Z",
            duration: "2024-11-23T12:00:00Z",
            date: "2024-11-23",
          },
        ],
      },
      amount: 150,
    },
  });
  t.is(body.statusCode, 400);  // To τεστ αποτυχαίνει και επιστρέφει κωδικό αποτυχίας 400.
});
