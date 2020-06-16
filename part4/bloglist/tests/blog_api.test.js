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


//verifies unique identifier propery of blog poses
test('unique identifier propery of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('can add a new blog post', async () => {
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

test('if likes property of blog is missing, defaults to 0', async () => {
  const newBlogWithoutLikes = helper.newBlogWithoutLikes
  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(res => {
      res.body.likes === 0
    })
})

test('if title and url properties are missing from request, responds with 400 Bad Request', async () => {
  const newBlogWithoutTitleAndUrl = helper.newBlogWithoutTitleAndUrl
  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleAndUrl)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})