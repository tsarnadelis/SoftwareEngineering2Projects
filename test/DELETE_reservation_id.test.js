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

test("deleteReservation does not throw errors", async (t) => {
  await t.notThrowsAsync(() => deleteReservation(0));
});

test("DELETE /reservation/{id} returns correct response and status code", async (t) => {
    const { body, statusCode } = await t.context.got.delete('reservation/0');
    t.is(statusCode, 200);
    t.deepEqual(body, '');
});

// test("DELETE /reservation/{id} with non-existent id returns 404", async (t) => {
//   const error = await t.throwsAsync(() => t.context.got.delete("reservation/99999"));
//   t.is(error.response.statusCode, 404);
// });

test("DELETE /reservation/{id} with invalid id returns 400", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.delete("reservation/invalid"));
  t.is(error.response.statusCode, 400);
});

test("DELETE /reservation/{id} without id returns 405", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.delete("reservation"));
  t.is(error.response.statusCode, 405);
});

test("DELETE /reservation/{id} with valid id and attributes returns error", async (t) => {
  const error = await t.throwsAsync(() => t.context.got.delete('reservation/0?address="address"&type="type"&charger=true'));
  t.is(error.response.statusCode, 400);
});

// test("DELETE /reservation/{id} with valid id and authorized user returns 200", async (t) => {
//   const { body, statusCode } = await t.context.got.delete('reservation/1', { headers: { Authorization: 'ValidToken' } });
//   t.is(statusCode, 200);
//   t.deepEqual(body, '');
// });
// 