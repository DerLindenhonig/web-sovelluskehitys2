import React from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const LoginForm = ({ setUser, username, setUsername, password, setPassword, setMessage }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        content: 'wrong credentials',
        type: 'errorMessage'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
      <div>Do not have account? <Link to={'/registration'}>Create new account!</Link></div>
    </div>
  )
}

LoginForm.propTypes = {
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm