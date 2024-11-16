const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("GET /spot returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("spot");
  const expectedResponse = [
    {
      "address": "address",
      "id": 0,
      "type": "type",
      "chargerAvailability": true
    },
    {
      "address": "address",
      "id": 0,
      "type": "type",
      "chargerAvailability": true
    }
  ];
    t.deepEqual(body, expectedResponse);
    t.is(statusCode, 200);
});

// test("GET /spot/search returns correct response and status code", async (t) => {
// 	const { body, statusCode } = await t.context.got('spot/search?address="address"&type="type"&charger=true');
//   const expectedResponse = [
//     {
//       "address": "address",
//       "id": 0,
//       "type": "type",
//       "chargerAvailability": true
//     },
//     {
//       "address": "address",
//       "id": 0,
//       "type": "type",
//       "chargerAvailability": true
//     }
//   ];
//     t.deepEqual(body, expectedResponse);
//     t.is(statusCode, 200);
// });