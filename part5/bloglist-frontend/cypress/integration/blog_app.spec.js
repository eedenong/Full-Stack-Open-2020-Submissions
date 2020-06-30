describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'John Wick',
      username: 'johnwick',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
    cy.viewport(960,540)
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('is successful with valid credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('johnwick')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('John Wick logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('johnwick')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Wick logged in')
    })
  })
})