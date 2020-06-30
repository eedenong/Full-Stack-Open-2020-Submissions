import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogsCompare = (a, b) => {
    const aLikes = a.likes
    const bLikes = b.likes
    if (aLikes < bLikes) {
      return 1
    }
    if (aLikes > bLikes) {
      return -1
    }
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(blogsCompare)
      setBlogs(sortedBlogs)
    })
  }, [])

  //check if user details can be found in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON is', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // login and get the response data
      const user = await loginService.login({ username, password })
      //set the token
      blogService.setToken(user.token)
      //save the user to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      //set user
      setUser(user)
      //reset username and password fields
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
      setIsErrorNotification(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      //remove the token
      blogService.setToken(null)
      //remove the user from local storage
      window.localStorage.removeItem('loggedBlogappUser')
      //set the user state to null
      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
        .addBlog(blogObject)
        .then(returnedBlogObject => {
          setBlogs(blogs.concat(returnedBlogObject))
          //notify user
          setNotification(`A new blog ${returnedBlogObject.title} by ${returnedBlogObject.author} added`)
          setIsErrorNotification(false)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    } catch (exception) {
      setNotification('Error adding blog')
      setIsErrorNotification(true)
      setTimeout(() => {
        setNotification(null)
      })
      console.log('error adding blog', exception)
    }
  }

  const likeBlog = (blog) => {
    try {
      blogService
        .likeBlog(blog)
        .then(returnedBlogObject => {
          console.log('blogObject with updated likes', returnedBlogObject)
        })
    } catch (exception) {
      console.log('error in liking blog', exception)
    }
  }

  const deleteBlog = (blog) => {
    try {
      const deleteConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (deleteConfirmed) {
        blogService
          .deleteBlog(blog)
          .then(response => console.log('delete response', response))
      }
    } catch (exception) {
      console.log('error deleting blog', exception)
    }
  }

  const blogForm = () => (
    <Togglable showButtonLabel='create new blog' hideButtonLabel='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsList = () => (
    <div id='blogs-list'>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLikeToBlog={likeBlog} handleBlogDelete={deleteBlog} />
        )}
      </div>
    </div>
  )

  const blogsPage = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} isErrorNotification={isErrorNotification} />
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button> </div>
      <br />
      <div>
        {blogForm()}
      </div>
      <div>
        {blogsList()}
      </div>
    </div>
  )

  const loginPage = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={notification} isErrorNotification={isErrorNotification} />
      <Togglable showButtonLabel='login' hideButtonLabel='cancel'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin} />
      </Togglable>
    </div>
  )

  return (
    <div>
      { user ===  null
        ? loginPage()
        : blogsPage()
      }
    </div>
  )
}

export default App