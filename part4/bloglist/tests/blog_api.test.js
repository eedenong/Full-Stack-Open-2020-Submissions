const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

//beforeEach to start from fresh DB
beforeEach(async () => {
  await Blog.deleteMany({})
 // console.log('cleared')
  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog))

  const promiseArr = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArr)
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
    //console.log('in second test')
    const response = await api.get('/api/blogs')
    //console.log('response body ', response.body)
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
  test('succeeds with 201 with valid data', async () => {
    const newBlog = helper.newBlog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    //verify that the total number of blogs increase by one
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    //verify that the content is saved correctly
    const titles = blogsAtEnd.map(blogs => blogs.title)
    expect(titles).toContain(newBlog.title)
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
    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitleAndUrl)
      .expect(400)
  })
  
})
describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
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
