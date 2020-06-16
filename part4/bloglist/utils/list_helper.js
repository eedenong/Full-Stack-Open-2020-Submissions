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
  const names = array.zipWith(blogs, (blog) => blog.author)
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
  
  return object.create({}, {
    author: author,
    blogs: count
  })

}

const mostLikes = (blogs) => {
  const names = array.zipWith(blogs, (blog) => blog.author)
  const zeroes = new Array(names.length).fill(0)
  let authorLikes = array.zipObject(names, zeroes)

  blogs.forEach(blog => {
    const author = blog.author
    const likes = authorLikes[author] + blog.likes
    authorLikes = {...authorLikes, [author]: likes}
  })

  let author = ""
  let likes = 0
  object.forIn(authorLikes, (value, key) => {
    if (value > likes) {
      author = key
      likes = value
    }
  })
  
  return object.create({}, {
    author: author,
    likes: likes
  })
}

module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}