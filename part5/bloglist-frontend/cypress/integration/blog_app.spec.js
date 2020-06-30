describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'John Wick',
      username: 'johnwick',
      password: 'password'
    }

    const user2 = {
      name: 'Mr Bob',
      username: 'mrbob',
      password: 'hello'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
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
        //creates a blog as user johnwick
        cy.createBlog({
          title: 'this is a blog',
          author: 'An Anonymous Author',
          url: 'anonymous.blog'
        })
      })

      it('user can like the blog', function() {
        cy.viewBlog('this is a blog by An Anonymous Author').as('viewedBlog')
        cy.get('@viewedBlog').contains('like').click()
        cy.get('@viewedBlog').contains('1')

      })

      it('user who created the blog is able to delete the blog', function() {
        cy.viewBlog('this is a blog by An Anonymous Author').as('viewedBlog')
        cy.get('@viewedBlog').contains('remove').click()
        cy.visit('http://localhost:3000')
        cy.get('#blogs-list')
          .should('not.contain', 'this is a blog by An Anonymous Author')
      })

      it('other users who did not create blog cannot delete the blog', function() {
        cy.login({ username: 'mrbob', password: 'hello' })
        cy.viewBlog('this is a blog by An Anonymous Author').as('viewedBlog')
        cy.get('@viewedBlog')
          .should('not.contain', 'remove')
      })
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'I should be top',
          author: 'Author 1',
          url: 'blog1.com',
          likes: 3
        })
        cy.createBlog({
          title: 'I should be bottom',
          author: 'Author 2',
          url: 'blog2.com',
          likes: 1
        })
        cy.createBlog({
          title: 'I should be middle',
          author: 'Author 3',
          url: 'blog3.com',
          likes: 2
        })
      })

      it('blogs are sorted according in descending order of likes', function() {
        cy.get('#blogs-list')
          .then(blogsListDiv => {
            cy.get('.blog')
          })
          .then(blogs => {
            cy.wrap(blogs[0]).should('contain', 'I should be top')
            cy.wrap(blogs[1]).should('contain', 'I should be middle')
            cy.wrap(blogs[2]).should('contain', 'I should be bottom')
          })
      })
    })
  })
})