describe('GET /spot', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs')
  })

  it('Title exists', () => {
    cy.get('.title').should('contain.text', 'Curbsprings API')
  })

  it('Description exists', () => {
    cy.get('.description').should('include.text', 'API for managing parking spots, reservations, users, and payments.')
  })

  it('All types of endpoints exists', () => {
    cy.get('.opblock-tag').should('have.length', 5)
  })

  it('Click on accordion', () => {
    cy.get('#operations-Spot-getSpots').click();
  })

  it('Open accordion should include description', () => {
    cy.get('#operations-Spot-getSpots')
    .click()
    .find('.opblock-description')
    .should('include.text', 'FR1: The user must be able to view all available parking spots')
  })
})