const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { modifyPlate } = require('../service/LicensePlateService.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});
test.after.always((t) => {
  t.context.server.close();
});


test('PUT /licensePlate 404 for creating a licenseplate instead of updating', async (t) => {
   // Test for attempting to create a new license plate with PUT instead of updating
  const { body }=await t.context.got.put('licensePlate', {
    json: {
        "licensePlate": "DEK1314",
        "id": 18
    },
});
  t.is(body.response.statusCode, 404); 
});

test('PUT / 200 for successful modification of a  licenseplate', async (t) => {
   // Test for successful update of an existing license plate
    const { body, statusCode }=await t.context.got.put('licensePlate', {
        json: {
            "licensePlate": "AKH1315",
            "id": 15
        },
    });

    t.is(statusCode, 200);
    t.falsy(body); 
});




test("Put /licenseplate 400 if licenseplate already exists", async (t) => {
  //Το test αποτυχαίνει διότι το licenseplate υπάρχει ήδη
  const { body } = await t.context.got.put("licensePlate",
    { json: {
     "licensePlate": "AKH1314",
     "id": 15
   }});
  t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});



test("Put /licenseplate 400 if id is a negative integer", async (t) => {
  //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό
  const { body } = await t.context.got.put("licensePlate",
    { json: {
     "licensePlate": "AKH1314",
     "id": -4
     
   }});
  t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});


test("Put /licenseplate 400 if id is empty", async (t) => {
  //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό
  const { body } = await t.context.got.put("licensePlate",
    { json: {
     "licensePlate": "AKH1314",
     "id": ""
     
   }});
  t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
});


test("Put /licenseplate with missing id returns 400", async (t) => {
  const { body } = await t.context.got.put("licensePlate",
      { json: {
       "licensePlate": "AKH1314",
      
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });


test("Put /licenseplate with missing licensePlate returns 400", async (t) => {
  // Test for missing license plate field
  const { body } = await t.context.got.put("licensePlate",
      { json: {
       "id": 10,
      
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });

test("Put /licenseplate with empty licensePlate returns 400", async (t) => {
  const { body } = await t.context.got.put("licensePlate",
      { json: {
          "id": 10,
          "licensePlate": ""
          
      }});
      t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });

  test("Put /licenseplate with non-string licensePlate returns 400", async (t) => {
    // Test for invalid license plate type (non-string)
    const invalid_type = await t.throwsAsync(() =>
        t.context.got.post("licensePlate", {
            json: {
                "id": 10,
                "licensePlate": 57, // Invalid type
            },
        })
    );

    // Assert error properties
    t.is(invalid_type.response.statusCode, 400);
    
});