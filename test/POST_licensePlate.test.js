const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
 
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



test("POST /licenseplate 200 for successful creation of a plate", async (t) => {
  // This test checks if a valid request with proper licenseplate and id returns a 200 status code.
    const { body , statusCode } = await t.context.got.post("licensePlate",{ 
      json: {
        "licensePlate": "MEX1234",
        "id": 24,
         
      }});
    t.is(statusCode, 200);  //μου επιστρέφει κωδικό επιτυχίας 200 
  
  });

  test("POST /licenseplate 400 if id is a negative integer", async (t) => {
     // This test ensures that a negative id results in a 400 Bad Request.
    const { body } = await t.context.got.post("licensePlate",
      { json: {
       "licensePlate": "AKH1314",
       "id": -4
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });

  test("POST /licenseplate 400 if id is empty", async (t) => {
     // This test checks if an empty id field results in a 400 Bad Request.
    const { body } = await t.context.got.post("licensePlate",
      { json: {
       "licensePlate": "AKH1314",
       "id": ""
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });
  
 

test("POST /licenseplate with missing id returns 400", async (t) => {
   // This test ensures that a missing id field causes a 400 Bad Request.
    const { body } = await t.context.got.post("licensePlate",
        { json: {
         "licensePlate": "AKH1314",
        
         
       }});
      t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });


test("Post /licenseplate with missing licensePlate returns 400", async (t) => {
    // This test checks if a missing licensePlate field causes a 400 Bad Request.
    const { body } = await t.context.got.post("licensePlate",
        { json: {
         "id": 10,
        
         
       }});
      t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });

test("Post /licenseplate with empty licensePlate returns 400", async (t) => {
    // This test checks if an empty licensePlate field causes a 400 Bad Request.
    const { body } = await t.context.got.post("licensePlate",
        { json: {
            "id": 10,
            "licensePlate": ""
            
        }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });

    
    test("Post /licenseplate with non-string licensePlate returns 400", async (t) => {
         // This test ensures that a licensePlate of incorrect type (non-string) causes a 400 Bad Request.
        const invalid_type = await t.throwsAsync(() =>
            t.context.got.post("licensePlate", {
                json: {
                    "id": 10,
                    "licensePlate": 57, // Invalid type
                },
            })
        );
    
        t.is(invalid_type.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
        
    });