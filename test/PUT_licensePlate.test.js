const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { modifyPlate } = require('../service/SpotService.js');

test.before(async (t) => {
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
  t.context.server.close();
});

test('PUT /licenseplate 200 for successful modification of a license plate', async (t) => {
    const { body, statusCode } = await t.context.got.put('licenseplate', {
      json: { 
        "licensePlate": "XYZ1234", // New license plate
        "userId": 1,                // Valid userId
      },
    });
  
    // Check that the server returns the correct status code
    t.is(statusCode, 200); // Expecting 200 OK status code
  
    // Verify that the updated license plate is returned correctly
    t.is(body.licensePlate, "XYZ1234"); // The updated license plate
    t.is(body.userId, 1); // Ensure the userId is correct
  });
  
    test('PUT /licenseplate 400 for missing userId', async (t) => {
        const error = await t.throwsAsync(() =>
        t.context.got.put('licenseplate', {
            json: { licensePlate: "XYZ1234" } // Missing userId
        })
        );
    
        t.is(error.response.statusCode, 400); // Check if response status code is 400
        t.is(error.response.body.message, "Missing required field: userId"); // Validate the response body
    });


test('PUT /licenseplate 400 for missing licensePlate', async (t) => {
    const error = await t.throwsAsync(() =>
    t.context.got.put('licenseplate', {
        json: { userId: 1 } // Missing licensePlate
    })
    );
    
    t.is(error.response.statusCode, 400); // Expecting 400 status for missing licensePlate
    t.is(error.response.body.message, "Missing required field: licensePlate"); // Check for error message
});

test('PUT /licenseplate 400 for invalid userId', async (t) => {
    const error = await t.throwsAsync(() =>
    t.context.got.put('licenseplate', {
        json: { userId: -1, licensePlate: "XYZ1234" } // Invalid userId (negative number)
    })
    );
    
    t.is(error.response.statusCode, 400); // Expecting 400 status for invalid userId
    t.is(error.response.body.message, "Invalid userId: must be a positive integer"); // Check for error message
});

test('PUT /licenseplate 400 for invalid licensePlate', async (t) => {
    const error = await t.throwsAsync(() =>
    t.context.got.put('licenseplate', {
        json: { userId: 1, licensePlate: 12 } // Invalid licensePlate (empty string)
    })
    );
    
    t.is(error.response.statusCode, 400); // Expecting 400 status for invalid licensePlate
    
});