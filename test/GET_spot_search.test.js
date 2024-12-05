const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { searchSpot } = require('../service/SpotService.js');


test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("searchSpot function returns correct JSON structure", async (t) => {
	const body = await searchSpot("address","type",true);
  	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
  	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("searchSpot function with only address returns correct JSON structure", async (t) => {
	const body = await searchSpot("address","",); // charger CANNOT BE EMPTY, it is needed and boolean
  	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
  	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("searchSpot function with only type returns correct JSON structure", async (t) => {
	const body = await searchSpot("","type",); // charger CANNOT BE EMPTY, it is needed and boolean
  	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
  	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("searchSpot function with only charger returns correct JSON structure", async (t) => {
	const body = await searchSpot("","",true); // charger CANNOT BE EMPTY, it is needed and boolean
  	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
  	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot/search endpoint returns valid JSON content-type header", async (t) => {
	const { headers, statusCode } = await t.context.got('spot/search?address=address&type=type&charger=true');
	t.is(statusCode, 200);                   // The status code should be 200
	t.is(headers["content-type"], "application/json"); // The content-type should be JSON
});

test("GET /spot/search endpoint returns 200 and JSON", async (t) => {
	const { body, statusCode } = await t.context.got('spot/search?address=address&type=type&charger=true');
  	t.is(statusCode, 200);        // status code should be 200
 	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
 	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot/search endpoint with only charger returns 200", async (t) => {
	const { body , statusCode } = await t.context.got('spot/search?address=&type=&charger=true'); // charger CANNOT BE EMPTY, it is needed and boolean
	t.is(statusCode, 200);   // The status code should be 200
	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
 	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot/search endpoint with only address returns 200", async (t) => {
	const { body , statusCode } = await t.context.got('spot/search?address=address&type=&charger=false'); // charger CANNOT BE EMPTY, it is needed and boolean
	t.is(statusCode, 200);   // The status code should be 200
	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
 	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot/search endpoint with only type returns 200", async (t) => {
	const { body , statusCode } = await t.context.got('spot/search?address=&type=type&charger=false'); // charger CANNOT BE EMPTY, it is needed and boolean
	t.is(statusCode, 200);   // The status code should be 200
	t.true(Array.isArray(body));  // response should be an array
  	t.is(body.length, 2);         // response should have 2 elements
  	spot = body[0];              // check the first element, the second should be the same
  	t.is(spot.address, "address"); // address should be "address"
 	t.is(spot.id, 0);              // id should be 0
  	t.is(spot.type, "type");       // type should be "type"
  	t.is(spot.chargerAvailability, true); // chargerAvailability should be true
});

test("GET /spot/search endpoint handles invalid routes with 404", async (t) => {
	const error = await t.throwsAsync(() => t.context.got("spot/search/invalid-route")); // This route does not exist
	t.is(error.response.statusCode, 404);   // The status code should be 404
});

test("GET /spot/search endpoint handles request without attributes with 400", async (t) => {
	const error = await t.throwsAsync(() => t.context.got('spot/search')); // Attributes are missing
	t.is(error.response.statusCode, 400);   // The status code should be 400 (Bad Request)
});

test("GET /spot/search with attributes not corresponding to the expected values returns error", async (t) => {
	const { body, statusCode } = await t.context.got('spot/search?address=&type=&charger=false');
	t.is(body.message, "No matching parking spots found."); // The message should be "No matching parking spots found."
	t.is(body.status, 404); // The status should be 404
});
