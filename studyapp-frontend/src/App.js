import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import cardService from './services/cards'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import Users from './components/Users'
import UserPage from './components/UserPage'
import Blog from './components/Blog'
import RegistrationForm from './components/RegistrationForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [refreshBlogs, setRefreshedBlogs] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      cardService.setToken(user.token)
    }
  }, [])

  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (error) {
      setMessage('logout is not succeed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const padding = {
    padding: 5
  }

  const blogId = (id) => blogs.find(blog => blog.id === id)

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user === null
          ? <Link style={padding} to="/login">login</Link>
          : <em>{user.name} logged in <button onClick={handleLogout}>logout</button></em>
        }
      </div>

      <div><Notification message={message}/></div>

      <div>
        <Switch>
          <Route path='/blogs/:id' render={({ match }) =>
            <Blog blog={blogId(match.params.id)} user={user} setRefreshedBlogs={setRefreshedBlogs} setBlogs={setBlogs} blogs={blogs}/>}
          />
          <Route path='/users'>
            {user ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path='/registration'>
            <RegistrationForm
              username={username}
              password={password}
              setPassword={setPassword}
              setUser={setUser}
              setUsername={setUsername}
              setMessage={setMessage}/>
          </Route>
          <Route path='/login'>
            {!user ? <LoginForm
              username={username}
              password={password}
              setPassword={setPassword}
              setUser={setUser}
              setUsername={setUsername}
              setMessage={setMessage}/> : <Redirect to="/" />}
          </Route>
          <Route path='/blogs'>
            {user ? <Blogs
              user={user}
              blogs={blogs}
              setRefreshedBlogs={setRefreshedBlogs}
              setBlogs={setBlogs}
              setMessage={setMessage}/> : <Redirect to="/login" />}
          </Route>
          <Route path='/'>
            {user ? <UserPage
              user={user}
              blogs={blogs}
              setRefreshedBlogs={setRefreshedBlogs}
              setBlogs={setBlogs}
              setMessage={setMessage}/> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App