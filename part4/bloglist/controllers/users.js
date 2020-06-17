const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User 
    .find({})
    .populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  //check password length
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  } 
  
    //encrypt password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    //create a new user
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter