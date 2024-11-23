'use strict';


/**
 * Process a payment through the payment gateway
 * FR8: The user must be able to make a payment through the payment gateway
 *
 * body Payment Payment object to process
 * no response value expected for this operation
 **/

//Τα απαιτούμενα πεδία του payment είναι το id του,
//το χρηματικό ποσό της πληρωμής (amount) και 
//ο χρήστης (user) που εκτελεί την πληρωμή
exports.makePayment = function (body) {
  return new Promise(function (resolve, reject) {
   //Αν το body είναι κενό ή αν κάποιο από τα απαιτούμενα πεδία λείπει,
   //τότε ο έλεγχος αποτυχαίνει με κωδικό αποτυχίας 400
    if (!body || !body.id || !body.amount || !body.user) {
      reject({
        statusCode: 400,
      });
      return;
    }

    // Επιτυχία: Επιστρέφει μόνο το statusCode
    resolve({ statusCode: 200 });
  });
};


