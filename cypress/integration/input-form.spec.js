describe('Input form', ()=>{
    beforeEach('Open page', ()=>{
        cy.seedAndVisit([])
    })
    it('focuses input on load', () => {
        //Check the auto-focus on load
        cy.focused()
        .should('have.class', 'new-todo')
    })

    it('accepts input', () => {
        const typedText = 'Buy milk' 
        cy.get('.new-todo')
          .type(typedText)
          .should('have.value', typedText)

    })

    context('Form submission', ()=>{
        beforeEach(()=>{
            cy.server()
        })
        it('adds new todo to the list',() => {
            const itemText='Buy Eggs'
            cy.route('POST','/api/todos',{
                  name: itemText,
                  id:1,
                  isComplete: false
              })
            cy.get('.new-todo')
              .type(itemText)
              .type('{enter}')
              .should('have.value', '')
            cy.get('.todo-list li')
              .should('have.length',1)
              .and('contain', itemText)
        })
        it('shows an error message on a failed submission', () => {
            cy.route({
                 url: '/api/todos',
                 method: 'POST',
                 status: 500,
                 response:{}
              })
            cy.get('.new-todo')
              .type('test{enter}')
            cy.get('todo-list li')
              .should('not.exist')
            cy.get('.error')
              .should('be.visible')
        })
    })
})