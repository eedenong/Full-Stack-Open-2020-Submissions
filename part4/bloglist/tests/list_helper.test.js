const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const res = listHelper.dummy(blogs)
  expect(res).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has more than one blog equals the sum of all likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

})

describe('favorite blog', () => {
  test('when list has only one blog, the favorite blog is that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has more than one blog, the favorite blog is the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const fav = blogs.find(blog => blog.title === "Canonical string reduction")
    expect(result).toEqual(fav)
  })
})

describe('most blogs', () => {
  test('when list has only one blog, the author with most blogs is the author of that blog', () =>{
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has more than one blog, is the author who has the highest count of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list has only one blog, is the author of the blog itself', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('when list has more than one blog, is author with the most total number of likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})