

Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => {
    cy.server()
      .route('GET', '/api/todos', seedData)
    cy.visit('/')
})