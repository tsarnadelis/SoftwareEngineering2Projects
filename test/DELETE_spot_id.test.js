const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { removeSpot } = require('../service/SpotService.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("removeSpot function does not throw error", async (t) => {
    await t.notThrowsAsync(() => removeSpot(0));
});

test("DELETE /spot/id endpoint returns valid JSON content-type header and response code", async (t) => {
	const { headers, statusCode } = await t.context.got.delete("spot/0");
	t.is(statusCode, 200);                   // The status code should be 200
	t.is(headers["content-type"], "application/json"); // The content-type should be JSON
});

test("DELETE /spot/id without id returns error", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.delete("spot"));
	t.is(error.response.statusCode, 405);   // The status code should be 405 (Method Not Allowed)
});

test("DELETE /spot/id with id not integer returns error", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.delete("spot/parking-spot"));
	t.is(error.response.statusCode, 400);   // The status code should be 400 (Bad Request)
});

test("DELETE /spot/id with valid id and atttributes returns error", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.delete('spot/0?address="address"&type="type"&charger=true'));
	t.is(error.response.statusCode, 400);   // The status code should be 400 (Bad Request)
});