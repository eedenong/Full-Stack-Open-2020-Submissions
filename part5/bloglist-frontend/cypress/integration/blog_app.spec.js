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
        .should('contain', 'Wrong username or')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Wick logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'johnwick', password: 'password'})
    })

    it('user can create a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('My First Blog')
      cy.get('#author').type('John Wick')
      cy.get('#url').type('myfirstblog.com')
      cy.get('#create-blog-button').click()

      cy.get('.notification')
        .should('contain', 'A new blog My First Blog by John Wick added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.get('#blogs-list')
        .contains('My First Blog')

    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'this is a blog',
          author: 'An Anonymous Author',
          url: 'anonymous.blog'
        })
      })

      it('user can like the blog', function() {
        cy.contains('this is a blog by An Anonymous Author')
          .contains('view')
          .click()
          .parent()
          .as('viewedBlog')
        cy.get('@viewedBlog').contains('like').click()
        cy.get('@viewedBlog').contains('1')

      })
    })
  })
})