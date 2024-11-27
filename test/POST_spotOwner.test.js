const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
 
const { addSpotOwner }=require('../service/SpotOwnerService.js');


test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
  });

test.after.always((t) => {
    t.context.server.close();
});

test("POST /spotowner 200 for successful registery of a spot owner", async (t) => {
  
    const { body, statusCode } = await t.context.got.post("spotowner", {
      json: {
        "id": 2,
        "idNumber": "15",
        "name": "kostas",
        "email": "kost@gmail.com",
        "phone": 9876543210,
        "spots": []
    }});
  
    t.is(statusCode, 200);  
    
  });

  test("POST /spotowner 400 if id is a negative integer", async (t) => {
    //Το test αποτυχαίνει διότι το id ισόυται με αρνητικό αριθμό

    const { body } = await t.context.got.post("spotowner",{
      json: {
        
       "id": -4,
        "idNumber": "15",
        "name": "kostas",
        "email": "kostas@gmail.com",
        "phone": 6986555555,
        "spots": []
       
     }});
    t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
  });
   
 

test("POST /spotowner with missing id returns 400", async (t) => {
    const { body } = await t.context.got.post("spotowner",
        { json: {
         "idNumber": "15",
        "name": "kostas",
        "email": "kostas@gmail.com",
        "phone": 6986555555,
        "spots": [] 
       }});
      t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });

test("POST /spotowner with missing idNumber returns 400", async (t) => {
    const { body } = await t.context.got.post("spotowner",
        { json: {
         "id": 2,
        "name": "kostas",
        "email": "kostas@gmail.com",
        "phone": 6986555555,
        "spots": [] 
         }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    });


test("Post /spotowner with inncorrect idNumber(not being a string) returns 400", async (t) => {
    const invalid_type = await t.throwsAsync(() =>
        t.context.got.post("spotowner", {
            json: {
                id: 10,
                "idNumber": 15,
                "name": "kostas",
                "email": "kostas@gmail.com",
                "phone": 6986555555,
                "spots": [] 
                }
            })
        );
    // Assert error properties
    t.is(invalid_type.response.statusCode, 400);
    
});

test("Post /spotowner with missing name returns 400", async (t) => {
    const { body } = await t.context.got.post("spotowner",
        { json: {
         "id": 2,
         "idNumber": "15",
        "email": "kostas@gmail.com",
        "phone": 6986555555,
        "spots": [] 
         }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    }
);

test("Post /spotowner with inncorrect name(not being a string) returns 400", async (t) => {
    const invalid_type = await t.throwsAsync(() =>
        t.context.got.post("spotowner", {
            json: {
                id: 10,
                "idNumber": "15",
                name: 15,
                "email": "kostas@gmail.com",
                "phone": 6986555555,
                "spots": [] 
            }
        })
    );
// Assert error properties
t.is(invalid_type.response.statusCode, 400);

});


test("Post /spotowner with missing email returns 400", async (t) => {
    const { body } = await t.context.got.post("spotowner",
        { json: {
         "id": 2,
         "idNumber": "15",
         "name": "kostas",
        "phone": 6986555555,
        "spots": [] 
         }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    }
);

test("Post /spotowner with incorrect email returns 400" , async (t) => {
    const invalid_type = await t.throwsAsync(() =>
        t.context.got.post("spotowner", {
            json: {
                id: 10,
                "idNumber": "15",
                "name": "kostas",
                email: 15,
                "phone": 6986555555,
                "spots": [] 
            }
        })
    );
// Assert error properties 
t.is(invalid_type.response.statusCode, 400);

});

test("Post /spotowner with missing phone returns 400", async (t) => {
    const { body } = await t.context.got.post("spotowner",
        { json: {
         "id": 2,
         "idNumber": "15",
         "name": "kostas",
         "email": "kostas@gmail.com",
         "spots": [] 
        }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    }
);

 
test("Post /spotowner with incorrect phone returns 400" , async (t) => {
    const invalid_type = await t.throwsAsync(() =>
        t.context.got.post("spotowner", {
            json: {
                id: 10,
                "idNumber": "15",
                "name": "kostas",
                "email": "kostas@gmail.com",
                "phone": "6986555555",
                "spots": [] 
            }
        })
    );
// Assert error properties 
t.is(invalid_type.response.statusCode, 400);

});


test("Post /spotowner with missing spots returns 400", async (t) => {
    const { body } = await t.context.got.post("spotowner",
        { json: {
         "id": 2,
         "idNumber": "15",
         "name": "kostas",
         "email": "kostas@gmail.com",
            "phone": 6986555555
            }});
        t.is(body.response.statusCode, 400);//μου επιστρέφει κωδικό αποτυχίας 400
    }
);