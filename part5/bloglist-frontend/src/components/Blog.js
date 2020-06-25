import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikeToBlog, handleBlogDelete }) => {
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
    setLikes(likes + 1)
    addLikeToBlog({
      ...blog,
      likes: likes
    })
  }

  const deleteBlog = () => {
    handleBlogDelete(blog)
    window.location.reload(false)
  }

  const deleteButton = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    //check if blog post was added by current user, via usernames
    const currUser = JSON.parse(loggedUserJSON).username
    const blogUser = blog.user.username
    if (currUser === blogUser) {
      return (
        <button onClick={deleteBlog}>remove</button>
      )
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLikeToBlog: PropTypes.func.isRequired,
    handleBlogDelete: PropTypes.func.isRequire
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
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
