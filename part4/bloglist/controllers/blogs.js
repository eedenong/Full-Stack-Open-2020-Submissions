const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    response
      .status(201)
      .json(savedBlog.toJSON())
  }
  
})

module.exports = blogsRouter
  
