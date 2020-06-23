import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(false)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      blogService
        .addBlog(blogObject)
        .then(returnedBlogObject => {
          setBlogs(blogs.concat(returnedBlogObject))
          setTitle('')
          setAuthor('')
          setUrl('')
          //notify user
          setNotification(`A new blog ${title} by ${author} added`)
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

  const blogForm = () => (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:<input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
          <br/>
          author:<input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
          <br/>
          url:<input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const blogsList = () => (
    <div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={notification} isErrorNotification={isErrorNotification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      { user ===  null
        ? loginForm()
        : blogsPage()
      }
    </div>
  )
}

export default App