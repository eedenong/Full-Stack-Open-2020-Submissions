import React from 'react'

const LoginForm = ( { username, password, handleUsernameChange, handlePasswordChange, handleLogin } ) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id='username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm