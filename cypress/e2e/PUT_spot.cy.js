describe('Spot modification in Swagger UI', () => {
    beforeEach(() => {
      // Επισκέπτεται τη σελίδα Swagger UI, στην οποία βρίσκεται το API για την τροποποίηση θέσης.
      cy.visit('http://localhost:8080/docs/#/Spot/modifySpot');
    });
  
    it('Successful spot modification', () => {
      // Περιμένει να φορτώσει το Swagger UI και βρίσκει το κουμπί 'Try it out' για να ξεκινήσει τη δοκιμή
      cy.contains('Try it out').click();
  
      // Συμπληρώνει το πεδίο id με τη τιμή 1
      cy.get('input[placeholder="id"]').type(1);
  
      // Συμπληρώνει τις παραμέτρους query: address, type, charger
      // Καθαρίζει το υπάρχον περιεχόμενο και εισάγει τις νέες τιμές
      cy.get('input[placeholder="address"]').clear().type('1234 Main St');
      cy.get('input[placeholder="type"]').clear().type('Garage');
      
      // Επιλέγει την τιμή 'true' από το dropdown menu για το πεδίο charger
      cy.get('tr[data-param-name="charger"] select')
        .should('be.visible')  // Επιβεβαιώνει ότι το dropdown menu είναι ορατό
        .select('true');        // Επιλέγει 'true' από το dropdown menu

      // Καθαρίζει το υπάρχον περιεχόμενο στο request body και εισάγει το νέο JSON
      cy.get('textarea.body-param__text') 
        .clear() 
        .type(`{
          "address": "1234 Main St",
          "id": 1,
          "type": "Garage",
          "chargerAvailability": true
        }`, { parseSpecialCharSequences: false });  // Εισάγει το νέο JSON χωρίς να ερμηνεύσει ειδικούς χαρακτήρες

      // Κάνει κλικ στο κουμπί 'Execute' για να στείλει το PUT αίτημα στον server
      cy.contains('Execute').click();

      // Ελέγχει αν η απάντηση είναι επιτυχής (200 status code)
      cy.contains('200').should('be.visible');
      
      // Ελέγχει αν η απάντηση περιέχει το μήνυμα ότι η θέση ενημερώθηκε επιτυχώς
      cy.contains('Parking spot updated successfully').should('be.visible');
    });
  
    it('Fail to modify the spot', () => {
      // Κάνει κλικ στο κουμπί 'Try it out'
      cy.contains('Try it out').click();
  
      //Σε αυτό το τεστ τα απαιτούμενα πεδία είναι κενά
      cy.get('input[placeholder="id"]').should('be.empty');       // Ελέγχει ότι το πεδίο id είναι κενό
      cy.get('input[placeholder="address"]').should('be.empty');  // Ελέγχει ότι το πεδίο address είναι κενό
      cy.get('input[placeholder="type"]').should('be.empty');     // Ελέγχει ότι το πεδίο type είναι κενό
        
      cy.get('tr[data-param-name="charger"] select')
        .should('be.visible')
        .select('--'); // Επιλέγει '--' για το πεδίο charger, δηλαδή δεν επιλέγει τιμή για τον charger

      /// Εστιάζει στο πεδίο και μετά το αφήνει για να εμφανιστεί το μήνυμα σφάλματος
      cy.get('input[placeholder="id"]').focus().blur();   // Εστιάζει και αφαιρεί το focus από το πεδίο ID
      cy.get('input[placeholder="address"]').focus().blur();  // Εστιάζει και αφαιρεί το focus από το πεδίο Διεύθυνσης
      cy.get('input[placeholder="type"]').focus().blur();     // Εστιάζει και αφαιρεί το focus από το πεδίο Τύπου

      // Προσπαθεί να στείλει το αίτημα χωρίς να συμπληρώσει τα απαιτούμενα πεδία
      cy.contains('Execute').click();

      // Ελέγχει ότι τα πεδία 'id', 'address' και 'type' έχουν την κλάση 'invalid', 
      // πράγμα που σημαίνει ότι τα πεδία είναι κενά και επομένως έχω σφάλμα
      cy.get('input[placeholder="id"]').should('have.class', 'invalid');
      cy.get('input[placeholder="address"]').should('have.class', 'invalid');
      cy.get('input[placeholder="type"]').should('have.class', 'invalid');

    });
});
