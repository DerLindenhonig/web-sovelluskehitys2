import React, { useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users'

const RegistrationForm = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [users, setUsers] = useState([])

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleAddAccount = (event) => {
    event.preventDefault()

    const newUser= ({
      username: newUsername,
      name: newName,
      password: newPassword
    })

    usersService
      .create(newUser)
      .then(returnedUser => {
        setUsers(users.concat(returnedUser))
      })

    setNewUsername('')
    setNewName('')
    setNewPassword('')
  }

  return (
    <div>
      <h1>Create new account</h1>
      <form onSubmit={handleAddAccount}>
        username: <input id='username' value={newUsername} onChange={handleUsernameChange}/> <br></br>
        name: <input id='name' value={newName} onChange={handleNameChange}/> <br></br>
        password: <input id='password' value={newPassword} onChange={handlePasswordChange}/> <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

RegistrationForm.propTypes = {
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default RegistrationForm