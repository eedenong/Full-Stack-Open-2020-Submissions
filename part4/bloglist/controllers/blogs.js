const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  //console.log('decoded token', decodedToken)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  } 

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes,
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response
  .status(201)
  .json(savedBlog.toJSON())
  
  
})

blogsRouter.delete('/:id', async (request, response) => {
  //console.log('deleting blog...')
  //get token of the user who sent the request
  const userToken = request.token
  //get the id of the user
  const decodedToken = jwt.verify(userToken, process.env.SECRET)
  //console.log('decoded token', decodedToken)
  const userId = decodedToken.id
  //get the blog to be deleted
  const blog = await Blog.findById(request.params.id)
  //console.log('blog user:', blog.user)
  //check if the blog's user is the same as the userId
  const sameCreator = blog.user.toString() === userId.toString()

  if (sameCreator) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'not the creator of the blog, cannot delete' })
  }
  
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(400).end()
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response
    .status(200)
    .json(updatedBlog.toJSON())
})

module.exports = blogsRouter
  
