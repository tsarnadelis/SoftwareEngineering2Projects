const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { makeReservation } = require('../service/ReservationService.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
  });

test.after.always((t) => {
	t.context.server.close();
});

// Τεστάρω τη συνάρτηση makeReservation αν μπορεί να επιβεβαιώσει την ύπαρξη μιας ήδη καταχωρημένης κράτησης μέσα στο σύστημα,
// ώστε να μην δημιουργηθεί νέα κράτηση με τα ίδια στοιχεία.
test("makeReservation function checks for a duplicate reservation", async (t) => {
    const body = await t.throwsAsync(() => makeReservation({
        date: "2024-11-19",
        startTime: "2024-11-19T08:00:00Z",
        duration: "2024-11-19T11:00:00Z",
        spotId: 1,
        id: 1,
        userId: 1
      }));

      t.is(body.response.statusCode, 400);
});

//Τεστάρω αν δεδομένα της κράτησης είναι έγκυρα
test("POST /reservation with invalid data returns 400", async (t) => {
    // Σε αυτό το τεστ , τα δεδομένα της κράτησης είναι μη έγκυρα.
    // Επομένως, το τεστ αποτυχαίνει και επιστρέφει κωδικό σφάλματος 400.
    const body = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date: "invalid", duration: "invalid", startTime: "invalid", userId: "invalid", spotId: "invalid", id: "invalid" }
    }));
    t.is(body.response.statusCode, 400);
});

//Τεστάρω αν όλα τα υποχρεωτικά πεδία της κράτησης είναι συμπληρωμένα
test("POST /reservation without required fields returns 400", async (t) => {
    // Σε αυτό το τεστ , τα πεδία της κράτησης είναι κενά.
    // Επομένως, το τεστ αποτυχαίνει και επιστρέφει κωδικό σφάλματος 400.
    const body = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date: "", duration: "", startTime: "", userId: "", spotId: "", id:"",  }
    }));
    t.is(body.response.statusCode, 400);
});

//Τεστάρω αν λείπει το id του χρήστη που κάνει τη κράτηση
test("POST /reservation with missing userId returns 400", async (t) => {
    // Σε αυτό το τεστ , λείπει το id του χρήστη που κάνει τη κράτηση.
    // Επομένως, το τεστ αποτυχαίνει και επιστρέφει κωδικό σφάλματος 400.
    const {body} = await t.context.got.post('reservation', {
        json: { date:"2024-11-19", duration: "2024-11-19T11:00:00Z", startTime: "2024-11-19T08:00:00Z", spotId: 1, id:1 }
    });
    t.is(body.response.statusCode, 400);
});

//Τεστάρω αν λείπει το id της θέσης για την οποία γίνεται η κράτηση
test("POST /reservation with missing spotId returns 400", async (t) => {
    // Σε αυτό το τεστ , λείπει το id της θέσης.
    // Επομένως, το τεστ αποτυχαίνει και επιστρέφει κωδικό σφάλματος 400.
    const {body} = await t.context.got.post('reservation', {
        json: { date:"2024-11-19", duration: "2024-11-19T11:00:00Z", startTime: "2024-11-19T08:00:00Z", userId: 1, id:1 }
    });
    t.is(body.response.statusCode, 400);
});

//Τεστάρω αν λείπει η ημερομηνία έναρξης της κράτησης
test("POST /reservation with missing startTime returns 400", async (t) => {
    // Σε αυτό το τεστ, λείπει η ημερομηνία έναρξης της κράτησης.
    // Επομένως, το τεστ αποτυχαίνει και επιστρέφει κωδικό σφάλματος 400.
    const {body} = await t.context.got.post('reservation', {
        json: { date:"2024-11-19", duration: "2024-11-19T11:00:00Z", userId:1, spotId: 1, id:1 }
    });
    t.is(body.response.statusCode, 400);
});

//Τεστάρω αν λείπει η ημερομηνία λήξης (δηλ. στην περιπτωσή μας η διάρκεια) της κράτησης
test("POST /reservation with missing duration returns 400", async (t) => {
    // Σε αυτό το τεστ, λείπει η διάρκεια της κράτησης.
    // Επομένως, το τεστ αποτυχαίνει και επιστρέφει κωδικό σφάλματος 400.
    const {body} = await t.context.got.post('reservation', {
        json: { date:"2024-11-19", startTime: "2024-11-19T08:00:00Z", userId:1, spotId: 1, id:1 }
    });
    t.is(body.response.statusCode, 400);
});

