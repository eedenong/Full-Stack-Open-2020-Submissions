import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      console.log('loggedUserJSON', loggedUserJSON)
      if (loggedUserJSON) {
        console.log('user successfully logged in json local storage', loggedUserJSON)
      }
      //set user
      setUser(user)
      //reset username and password fields
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button> </div>
      <br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
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
      <div>
        {errorMessage}
      </div>
      { user ===  null
        ? loginForm()
        : showBlogs()
      }
    </div>
  )
}

export default App