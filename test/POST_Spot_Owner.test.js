const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
//const { makeReservation } = require('../service/ReservationService.js');
const {  addSpotOwner }= require('../service/SpotOwnerService.js');

 



test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});



  
  test('Post /spotowner 400 for missing id', async (t) => {
    const error = await t.throwsAsync(() =>
      t.context.got.post('spotowner', {
        json: {
          id:1,
          name: "John Doe",
          email: "johndoe@gmail.com",
          phone: "1234567890",
          spots: []  // Missing id field
        }
      })
    );
  
    t.is(error.response.statusCode, 400); // Expecting 400 status for missing id
    
  });
  