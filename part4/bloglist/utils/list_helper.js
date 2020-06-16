const array = require('lodash/array')
const object = require('lodash/object')

//receives an array of blog posts, always returns 1
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (acc, blog) => {
    return blog.likes > acc.likes 
      ? blog
      : acc
  }
  return blogs.reduce(reducer)
}

//returns author who has the largest amount of blogs, and the number of blogs author has
const mostBlogs = (blogs) => {
  //have a list of objects,x, containing author, and the number of blogs they have
  //iterate through the list of blogs. for each iteration, check the author, find in x and increment count
  //first get an array of the author names from blogs
  const names = array.zipWith(blogs, (blog) => {
    return blog.author
  })
  const zeroes = new Array(names.length).fill(0)
  let authorCounts = array.zipObject(names, zeroes)

  blogs.forEach(blog => {
    const author = blog.author
    const count = authorCounts[author] + 1
    authorCounts = {...authorCounts, [author]: count }
  })
  let author = ""
  let count = 0
  object.forIn(authorCounts, (value, key) => {
    if (value > count) {
      author = key
      count = value
    }
  })
  const obj = object.create({}, {
    author: author,
    blogs: count
  })

  return obj
}


module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}