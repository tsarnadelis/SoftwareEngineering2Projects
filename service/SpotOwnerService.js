/**
 * Add a new spot owner
 * FR15: The system administrator must be able to add a spot owner to the system
 *
 * body SpotOwner Spot owner object to add
 * no response value expected for this operation
 **/
exports.addSpotOwner = function(body) {
  return new Promise((resolve, reject) => {
    // Define validation rules for each field
    const validations = [
      { key: 'id', rule: (value) => value >= 0 && Number.isInteger(value), errorMessage: 'Invalid id: must be a positive integer.' },
      { key: 'idNumber', rule: (value) => typeof value === 'string', errorMessage: 'Invalid idNumber: must be a string.' },
      { key: 'name', rule: (value) => typeof value === 'string', errorMessage: 'Invalid name: must be a string.' },
      { key: 'email', rule: (value) => typeof value === 'string', errorMessage: 'Invalid email: must be a string.' },
      { key: 'phone', rule: (value) => value !== undefined, errorMessage: 'No phone.' },
      { key: 'spots', rule: (value) => value !== undefined, errorMessage: 'No spots.' },
    ];

    // Loop through validations
    for (const { key, rule, errorMessage } of validations) {
      const value = body[key];
      if (!rule(value)) {
        const error = new Error(errorMessage);
        error.response = { statusCode: 400 };
        reject(error); // Reject with the appropriate error message and status code
        return;
      }
    }

    resolve(); // All validations passed
  });
};