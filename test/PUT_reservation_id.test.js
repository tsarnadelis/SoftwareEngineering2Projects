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

test('PUT /reservation/{id} 200 for succesful modification of a spot', async (t) => {
  const { body, statusCode } = await t.context.got.put('reservation/1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(statusCode, 200);
  t.falsy(body);
});

test ('PUT /reservation/{id} 400 if query_id !== body_id', async (t) => {
  const {body} = await t.context.got.put('reservation/1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 2
    },
  });
  t.is(body.response.statusCode, 400);
});

test ('PUT /reservation/{id} 400 if query_spotId !== body_spotId', async (t) => {
  const {body} = await t.context.got.put('reservation/1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 2,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400);
});

test ('PUT /reservation/{id} 400 if query_userId !== body_userId', async (t) => {
  const {body} = await t.context.got.put('reservation/1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 2,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400);
});

test ('PUT /reservation/{id} 400 for invalid id', async (t) => {
  const {body} = await t.context.got.put('reservation/invalid', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  }); 
  t.is(body.response.statusCode, 400);
} );

test ('PUT /reservation/{id} 400 for invalid date', async (t) => {
  const {body} = await t.context.got.put('reservation/1', {
    json: {
      "date": "invalid",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400);
});

test ('PUT /reservation/{id} 400 for invalid duration', async (t) => {
  const {body} = await t.context.got.put('reservation/1', {
    json: {
      "date": "2024-11-19",
      "duration": "invalid",
      "startTime": "2024-11-19T08:00:00Z",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400);
}); 

test ('PUT /reservation/{id} 400 for invalid startTime', async (t) => {
  const {body} = await t.context.got.put('reservation/1', {
    json: {
      "date": "2024-11-19",
      "duration": "2024-11-19T11:00:00Z",
      "startTime": "invalid",
      "userId": 1,
      "spotId": 1,
      "id": 1
    }
  });
  t.is(body.response.statusCode, 400);
});  
