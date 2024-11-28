const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { deleteReservation } = require('../service/ReservationService.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
  });

test.after.always((t) => {
	t.context.server.close();
});

// testing that deleteReservation operates without any errors
test("deleteReservation does not throw errors", async (t) => {
  await t.notThrowsAsync(() => deleteReservation(0));
});

// testing that DELETE /reservation/{id} returns 200 if given a valid id
test("DELETE /reservation/{id} returns correct response and status code", async (t) => {
    const { body, statusCode } = await t.context.got.delete('reservation/0');
    t.is(statusCode, 200);
    t.deepEqual(body, '');
});

//testing the endpoint in case of an invalid id (non integer) it should return 400 (Bad Request)
test("DELETE /reservation/{id} with invalid id returns 400", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.delete("reservation/invalid"));
  t.is(error.response.statusCode, 400);
});

// test the endpoint in case non id is given from the user
//The returned status code should be 405 (Bad Request)
test("DELETE /reservation/{id} without id returns 405", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.delete("reservation"));
  t.is(error.response.statusCode, 405);
});

// A DELETE Reservation request should be defined by a valid id only and not 
//additional attributes. If additional attributes are given, the request should return 400 (Bad Request)
test("DELETE /reservation/{id} with valid id and attributes returns error", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.delete('reservation/0?address="address"&type="type"&charger=true'));
  t.is(error.response.statusCode, 400);
});
