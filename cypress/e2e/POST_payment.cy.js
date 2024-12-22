describe('POST /payment', () => {
    beforeEach(() => {
        // Visit the Swagger UI before each test
        cy.visit('http://localhost:8080/docs')
    })

    it('Title exists', () => {
        //Check if the title contains the text 'Curbsprings API'
        cy.get('.title').should('contain.text', 'Curbsprings API')
    })

    it('Description exists', () => {
        // Check if the description includes the specified text
        cy.get('.description').should('include.text', 'API for managing parking spots, reservations, users, and payments.')
    })

    it('All types of endpoints exists', () => {
        // Check if there are 5 endpoint tags in the Swagger UI
        cy.get('.opblock-tag').should('have.length', 5)
    })

    it('Click on accordion', () => {
        // Click on the 'POST /payment' accordion to expand it
        cy.get('#operations-Payment-makePayment').click();
    })

    it('Open accordion should include description', () => {
        // Check if the expanded accordion includes the specified text
        cy.get('#operations-Payment-makePayment')
        .click()
        .find('.opblock-description')
        .should('include.text','FR8: The user must be able to make a payment through the payment gateway')
    })
})