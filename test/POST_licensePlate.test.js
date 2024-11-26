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



test("POST /spot 200 for successful creation of a plate", async (t) => {
  
    const { body , statusCode } = await t.context.got.post("spot",
       { json: {
        "licenseplate": "MEX1234",
        "id": 24,
         
      }});
    t.is(statusCode, 200);  
  
  });

  test("POST /spot 400 if id is a negative integer", async (t) => {
    //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό
    const { body } = await t.context.got.post("licenseplate",
      { json: {
       "licenseplate": "AKH1314",
       "id": -4
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });

  test("POST /spot 400 if id is empty", async (t) => {
    //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό
    const { body } = await t.context.got.post("licenseplate",
      { json: {
       "licenseplate": "AKH1314",
       
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });
  
 

test("POST /licenseplate with missing id returns 400", async (t) => {
    const { body } = await t.context.got.post("licenseplate",
        { json: {
         "licenseplate": "AKH1314",
        
         
       }});
      t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });


test("Post /licenseplate with missing licensePlate returns 400", async (t) => {
    const { body } = await t.context.got.post("licenseplate",
        { json: {
         "id": 10,
        
         
       }});
      t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });

test("Post /licenseplate with empty licensePlate returns 400", async (t) => {
    const { body } = await t.context.got.post("licenseplate",
        { json: {
            "id": 10,
            "licensePlate": ""
            
        }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });

    
    test("Post /licenseplate with non-string licensePlate returns 400", async (t) => {
        const invalid_type = await t.throwsAsync(() =>
            t.context.got.post("licenseplate", {
                json: {
                    id: 10,
                    licensePlate: 57, // Invalid type
                },
            })
        );
    
        // Assert error properties
        t.is(invalid_type.response.statusCode, 400);
        
    });



  


 

