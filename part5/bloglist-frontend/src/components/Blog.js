import React, { useState } from 'react'

const Blog = ({ blog, addLikeToBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = (event) => {
    event.preventDefault()
    addLikeToBlog(blog)
    setLikes(likes + 1)
  }
  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} 
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        {likes}<button onClick={likeBlog}>like</button><br/>
        {blog.user.name}<br/>
      </div>
    </div>

  )
}

export default Blog
