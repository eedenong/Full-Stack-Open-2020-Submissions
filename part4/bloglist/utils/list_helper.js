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

module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog
}