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

test("makeReservation function returns correct JSON structure", async (t) => {
    const body = await makeReservation("2024-11-19", "08:00", 180, 1, 1, 1);
    t.true(Array.isArray(body));
    t.is(body.length, 2);
    reservation=body[0];
    t.is(reservation.date, "2024-11-19");
    t.is(reservation.startTime, "08:00");
    t.is(reservation.duration, "180");
    t.is(reservation.userId, 1);
    t.is(reservation.spotId, 1);
    t.is(reservation.id, 1);
});


test("POST /reservation with invalid data returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date: "invalid", duration: "invalid", startTime: "invalid", userId: "invalid", spotId: "invalid", id: "invalid" }
    }));
    t.is(error.response.statusCode, 400);
});

test("POST /reservation without required fields returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date: "", duration: "", startTime: "", userId: "", spotId: "", id:"",  }
    }));
    t.is(error.response.statusCode, 400);
});

test("POST /reservation with missing userId returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date:"2024-11-19", duration: 180, startTime: "08:00", spotId: 1, id:1 }
    }));
    t.is(error.response.statusCode, 400);
});

test("POST /reservation with missing spotId returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date:"2024-11-19", duration: 180, startTime: "08:00", userId: 1, id:1 }
    }));
    t.is(error.response.statusCode, 400);
});

test("POST /reservation with missing startTime returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date:"2024-11-19", duration: 180, userId:1, spotId: 1, id:1 }
    }));
    t.is(error.response.statusCode, 400);
});

test("POST /reservation with missing duration returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('reservation', {
        json: { date:"2024-11-19", startTime: "08:00", userId:1, spotId: 1, id:1 }
    }));
    t.is(error.response.statusCode, 400);
});

