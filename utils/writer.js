// Constructor for creating a response payload with a status code and payload
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Function to create a ResponsePayload object with a given status code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Function to write a JSON response 
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;
  
  // If arg1 is an instance of ResponsePayload, extract the payload and code
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the status code from arg2 if it is an integer
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    // Determine the status code from arg1 if it is an integer
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }

  // Set the payload based on the provided arguments
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  // If the payload is an object, convert it to a JSON string
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  // Set the response header with the response code and content type
  response.writeHead(code, {'Content-Type': 'application/json'});
  //Send the response with the payload
  response.end(payload);
}
