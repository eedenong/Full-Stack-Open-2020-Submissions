const Blog = require('../models/blog')
const User = require('../models/user')

const newBlog = 
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

const newBlogWithoutLikes = 
{
  title: 'Hello hello',
  author: 'Doug Judy',
  url: 'http://undefined.lmao'
}

const newBlogWithoutTitleAndUrl = 
{
  author:'wasup yo',
}

const initialBlogs = [ 
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, user: "5eeb046c1bd1e36e245103a0", __v: 0 }, 
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12,user: "5eeb046c1bd1e36e2451039f", __v: 0 }, 
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, user: "5eeb046c1bd1e36e2451039f", __v: 0 }, 
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", user: "5eeb046c1bd1e36e245103a0", likes: 0, __v: 0 }, 
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, user: "5eeb046c1bd1e36e245103a0", __v: 0 }
]

const initialUsers = [
  {
    "username": "chickenwingz97",
    "name": "Mikey D",
    "password": "ilovechickenwingz",
    "blogs": []
  },
  {
    "username": "pancakeboi1",
    "name": "Chuck E",
    "password": "pancakez4lyfe",
    "blogs": []
  }
]

// a user that exists in the database
const userForValidToken = {
  "username": "pancakeboi1",
  "password": "pancakez4lyfe"
}

const userForInvalidToken = {
  "username": "idonotexistindatabase",
  "password": "yeethaw"
}

const newUserInvalidPassword = 
{
  "username": "hehexd",
  "name": "Chuck E",
  "password": "no",
  "blogs": []
}

const newUserInvalidUsername =
{
  "username": "no",
  "name": "Chuck E",
  "password": "hehexd",
  "blogs": []
}

const blogsInDb = async () => {
  const blogs = await Blog
    .find({})
    .populate('user')
  return blogs.map(blog => blog.toJSON())
}

const getBlogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog.toJSON()
}

const usersInDb = async () => {
  const users = await User
    .find({})
    .populate('blogs')
  return users.map(user => user.toJSON())
}

module.exports = {
  newBlog,
  initialBlogs,
  newBlogWithoutLikes,
  newBlogWithoutTitleAndUrl,
  initialUsers,
  newUserInvalidPassword,
  newUserInvalidUsername,
  userForValidToken,
  userForInvalidToken,
  blogsInDb,
  getBlogById,
  usersInDb,
}