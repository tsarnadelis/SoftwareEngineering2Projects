const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
//const { makeReservation } = require('../service/ReservationService.js');
const { registerPlate }=require('../service/LicensePlateService.js');

 



test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

test("LicensePlate function returns correct JSON structure", async (t) => {
    const body = await registerPlate({ licensePlate: "AKH1314", userId: 1 });
    t.true(Array.isArray(body));
    t.is(body[0].licensePlate, "AKH1314"); // Ensure the licensePlate is correct
    t.is(body[0].userId, 1); // Ensure the userId is correct
});


test("POST /licenseplate with missing userId returns 400", async (t) => {
    const error = await t.throwsAsync(() =>
      t.context.got.post('licenseplate', {
        json: { licensePlate: "AKH1314" } // Missing userId
      })
    );
  
    t.is(error.response.statusCode, 400); // Check if response status code is 400
    //t.deepEqual(error.response.body, { error: "Missing userId" }); // Validate the response body
  });

test("Post /licenseplate with missing licensePlate returns 400", async (t) => {
    const error = await t.throwsAsync(() =>
      t.context.got.post('licenseplate', {
        json: { userId: 1 } // Missing licensePlate
      })
    );
    t.is(error.response.statusCode, 400); // Expecting 400 status for missing licensePlate
    t.is(error.response.body.message, "Missing required field: licensePlate"); // Check for error message
});

test("Post /licenseplate with invalid userId returns 400", async (t) => {
    const error = await t.throwsAsync(() =>
      t.context.got.post('licenseplate', {
        json: { userId: -1, licensePlate: "AKH1314" } // Invalid userId (negative number)
      })
    );
    
    t.is(error.response.statusCode, 400); // Expecting 400 status for invalid userId
    t.is(error.response.body.message, "Invalid userId: must be a positive integer"); // Check for error message
  });

  test("Post /licenseplate with invalid licensePlate returns 400", async (t) => {
    const error = await t.throwsAsync(() =>
      t.context.got.post('licenseplate', {
        json: { userId: 1, licensePlate: 12 } // Invalid licensePlate (empty string)
      })
    );
    
    t.is(error.response.statusCode, 400); // Expecting 400 status for invalid licensePlate
    //t.is(error.response.body.message, "Invalid licensePlate: must be a non-empty string"); // Check for error message
  });
  

/*
test("POST /LicensePlate with missing userId returns 400", async (t) => {
    const error = await t.throwsAsync(() => t.context.got.post('licenseplate', {
        json: {  licensePlate: "AKH1314" } // missing userId
    }));
    t.is(error.response.statusCode, 400); // Assert that the status code is 400
});
*/
 
/*
test('POST /licenseplate with missing userId returns 400', async t => {
    const error = await t.throwsAsync(() =>
        got.post('http://localhost:3000/licenseplate', {
            json: { licensePlate: 'AKH1314' }, // missing userId
            responseType: 'json'
        })
    );
    
    t.is(error.response.statusCode, 400); // Assert that status code is 400
});
*/

