const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { getSpots } = require('../service/SpotService.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("getSpots function returns correct JSON structure", async (t) => {
	const body = await getSpots();
  t.true(Array.isArray(body));  // response should be an array
  t.is(body.length, 2);         // response should have 2 elements
  spot = body[0];              // check the first element, the second should be the same
  t.is(spot.address, "address"); // address should be "address"
  t.is(spot.id, 0);              // id should be 0
  t.is(spot.type, "type");       // type should be "type"
  t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot endpoint returns valid JSON content-type header", async (t) => {
	const { headers, statusCode } = await t.context.got("spot");
	t.is(statusCode, 200);                   // The status code should be 200
	t.is(headers["content-type"], "application/json"); // The content-type should be JSON
});

test("GET /spot endpoint returns 200 and JSON", async (t) => {
	const { body, statusCode } = await t.context.got("spot");
  t.is(statusCode, 200);        // status code should be 200
  t.true(Array.isArray(body));  // response should be an array
  t.is(body.length, 2);         // response should have 2 elements
  spot = body[0];              // check the first element, the second should be the same
  t.is(spot.address, "address"); // address should be "address"
  t.is(spot.id, 0);              // id should be 0
  t.is(spot.type, "type");       // type should be "type"
  t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot endpoint handles invalid routes with 404", async (t) => {
	const error = await t.throwsAsync(() => t.context.got("mock-invalid-spot-route")); // This route does not exist
	t.is(error.response.statusCode, 404);   // The status code should be 404
});

test("GET /spot endpoint handles request with attributes with 400", async (t) => {
	const error = await t.throwsAsync(() => t.context.got('spot?address="address"&type="type"&charger=true')); // Attributes are not supported
	t.is(error.response.statusCode, 400);   // The status code should be 400
});
