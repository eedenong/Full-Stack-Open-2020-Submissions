const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

//before each test, initialise a clean db
beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers
    .map((user) => new User(user))

  const promiseArr = userObjects.map(user => user.save())
  await Promise.all(promiseArr)
})

describe('when adding a new user', () => {
  test('if user information is valid, user is successfully added', async () => {
    const newUser = {
      username: "peepeepoopoo",
      name: "Mr Bubbles",
      password: "secret"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
  })

  test('if username is not unique, 400 Bad Request is returned', async () => {
    const dupeUser = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(dupeUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('if the password is less than 3 characters long, 400 Bad Request is returned', async () => {
    const newUserInvalidPassword = helper.newUserInvalidPassword
    await api
      .post('/api/users')
      .send(newUserInvalidPassword)
      .expect(400)

    //check that the invalid user has not been added
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

  })

  test('if username is less than 3 characters lng, 400 Bad Request is returned', async () => {
    const newUserInvalidUsername = helper.newUserInvalidUsername
    await api
      .post('/api/users')
      .send(newUserInvalidUsername)
      .expect(400)

      //check that the invalid user has not been added
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})