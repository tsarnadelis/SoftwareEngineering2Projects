describe('Spot owner registration in Swagger UI', () => {
    beforeEach(() => {
      // Επισκέπτεται τη σελίδα Swagger UI, στην οποία βρίσκεται το API για την τροποποίηση θέσης.
      cy.visit('http://localhost:8080/docs/#/SpotOwner/addSpotOwner');
    });

    it('Succesful Spot owner registration', () => {


      cy.contains('Try it out').click();
    
       // Ensure the request body textarea is visible
    cy.get('textarea.body-param__text').should('be.visible');
         
        cy.get('textarea.body-param__text')
        .clear()
        .type(`{
          "id": 0,
          "name": "John Doe",
          "email": "user@example.com",
          "idNumber": "123456789",
          "phone": 1234567890,
          "spots": [
            {
              "address": "1234 Main St",
              "id": 1,
              "type": "Garage",
              "chargerAvailability": true
            }
          ]
        }`, { parseSpecialCharSequences: false });
        

        cy.contains('Execute').click();
            
        // Assert that the response code 201 (created) is shown
        cy.contains('201').should('be.visible');
        
        // Assert that the success message appears: 'Spot owner added successfully'
        cy.contains('Spot owner added successfully').should('be.visible');
    });





});