const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

//beforeEach to start from fresh DB
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogObjects = helper.initialBlogs
  const userObjects = helper.initialUsers
  const userPromiseArr = userObjects.map(async (user) => {
    await api.post('/api/users').send(user)

  })
  await Promise.all(userPromiseArr)
  //for each blog, login with a random user and assign that blog to the user
  const populateBlogsPromiseArr = async () => {
    const len = blogObjects.length
    for (let i = 0; i < len; i++) {
      const user = userObjects[Math.floor(Math.random() * userObjects.length)]
      const loginResponse = await api.post('/api/login').send(user).expect(200)
      const token = 'bearer '.concat(loginResponse.body.token)
      const response = await api 
        .post('/api/blogs')
        .send(blogObjects[i])
        .set('Authorization', token)
        .expect(201)
      blogObjects[i] = response.body
    }
  }
  
  const blogsPromiseArr = populateBlogsPromiseArr()
  await Promise.resolve(blogsPromiseArr)
})

describe('if there are blogs initially', () => {
  test('blogs are returned as json', async () => {
    //console.log('in first test')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  
  //verifies unique identifier property of blog poses
  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('succeeds with 201 with valid data and token', async () => {
    const newBlog = helper.newBlog
    const loginResponse = await api.post('/api/login').send(helper.userForValidToken).expect(200)
    const token = 'bearer '.concat(loginResponse.body.token)
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
  
    //verify that the total number of blogs increase by one
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    //verify that the content is saved correctly
    const titles = blogsAtEnd.map(blogs => blogs.title)
    expect(titles).toContain(newBlog.title)
  })
  
  test('fails with 401 Unauthorized if token is missing', async () => {
    const newBlog = helper.newBlog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    //verify that the total number of blogs increase by one
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('has likes defaulted to 0, if missing from request', async () => {
    const newBlogWithoutLikes = helper.newBlogWithoutLikes
    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(res => {
        res.body.likes === 0
      })
  })
  
  test('fails with 400 Bad Request if title and url are missing', async () => {
    const newBlogWithoutTitleAndUrl = helper.newBlogWithoutTitleAndUrl
    const loginResponse = await api.post('/api/login').send(helper.userForValidToken).expect(200)
    const token = 'bearer '.concat(loginResponse.body.token)
    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitleAndUrl)
      .set('Authorization', token)
      .expect(400)
  })
  
})

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id and token is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const blogUserId = blogToDelete.user.id.toString()
    const blogUser = await User.findById(blogUserId)
    const blogUserUsername = blogUser.username
    const getUserPassword = (users, username) => {
      let password = ""
      for (const user of users) {
        if (user.username === username) {
          password = user.password
        }
      }
      return password
    }
    const blogUserPassword = getUserPassword(helper.initialUsers, blogUserUsername)
    const userToSend = {
      username: blogUserUsername,
      password: blogUserPassword
    }
    const loginResponse = await api.post('/api/login').send(userToSend).expect(200)
    const token = 'bearer '.concat(loginResponse.body.token)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    //verify that the blog has been deleted successfully from the db
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
