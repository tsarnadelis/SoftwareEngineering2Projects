const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { modifyReservation } = require('../service/ReservationService.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});
//date === the reservation date
//duration === the reservation duration
//startTime === the reservation start time
//userId === the id of the user that made the reservation
//spotId === the id of the spot that the reservation is made for
//id === the unique id of the reservation provided by the system

//testing if the attributes that must be modified are valid
test('PUT /reservation/{id} 200 for succesful modification of a spot', async (t) => {
  //In this test the query parameters are the same as the body parameters
  //The reservation is modified successfully and the status code is 200
  //The response body is empty
  const { body, statusCode } = await t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(statusCode, 200); //checking that the status code is 200
  t.falsy(body); //confirming that the response body is empty
});

//testing if the query id is a match with the request body id
test ('PUT /reservation/{id} 400 if query_id !== body_id', async (t) => {
  //In this test query id=1 body id=2 so the test fails
  const {body} = await t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 2
    },
  });
  t.is(body.response.statusCode, 400); // checking that the status code is 400 (Bad Request)
});

//testing if the query spotId is a match with the request body spotId
test ('PUT /reservation/{id} 400 if query_spotId !== body_spotId', async (t) => {
  //In this test query spotId=1 body spotId=2 so the test fails
  const {body} = await t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 2,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400); // checking that the status code is 400 (Bad Request)
});

//testing if the query date is a match with the request body date
test ('PUT /reservation/{id} 400 if query_userId !== body_userId', async (t) => {
  //In this test query userId=1 body userId=2 so the test fails
  const {body} = await t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 2,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400); // checking that the status code is 400 (Bad Request)
});

//testin what happens in case of an invalid query id
test ('PUT /reservation/{id} 400 for invalid id', async (t) => {
  //In this test query_id==body_id==-3 but we can't have a negative id so the test fails
  const {body} = await t.context.got.put('reservation/-3?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": -3
    }
  }); 
  t.is(body.response.statusCode, 400); // checking that the status code is 400 (Bad Request)
} );

//testing what happens in case of an invalid body date
test ('PUT /reservation/{id} 400 for invalid date', async (t) => {
  //in this test even thoug the query is properly formatted the body date is invalid because it is an integer
  const body = await t.throwsAsync(() =>t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": 12,
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  }));
  t.is(body.response.statusCode, 400);// checking that the status code is 400 (Bad Request)
});

//testing what happens in case of an invalid body duration
test ('PUT /reservation/{id} 400 for invalid duration', async (t) => {
  //test fails because the body duration is an integer
  const body = await t.throwsAsync(() =>  t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": 33,
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  }));
  t.is(body.response.statusCode, 400); // checking that the status code is 400 (Bad Request)
}); 

//testing what happens in case of an invalid body startTime
test ('PUT /reservation/{id} 400 for invalid startTime', async (t) => {
  //test fails because the body startTime is an integer
  const body = await t.throwsAsync(() => t.context.got.put('reservation/1?date=2024-11-19&duration=2024-11-19T11%3A00%3A00Z&startTime=2024-11-19T08%3A00%3A00Z&userId=1&spotId=1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": 11,
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  }));
  t.is(body.response.statusCode, 400); // checking that the status code is 400 (Bad Request)
});  
