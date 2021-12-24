import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

const EditAccount = ({ user, editUser }) => {
  const [newUsername, setNewUsername] = useState(user.username)
  const [newName, setNewName] = useState(user.name)

  /*const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }*/

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleEditBlog = (event) => {
    event.preventDefault()
    if(newUsername === '') {
      setNewUsername(user.username)
    }
    if(newName === '') {
      setNewName(user.name)
    }

    editUser({
      username: newUsername,
      name: newName,
    })

    setNewUsername('')
    setNewName('')
  }

  return (
    <div>
      <h4>Edit</h4>
      <form onSubmit={handleEditBlog}>
        <Form.Group className="mb-3">
          <Form.Label>New name</Form.Label>
          <Form.Control type="text" placeholder="Edit name" id='name' defaultValue={newName} onChange={handleNameChange}/>
        </Form.Group>
        <br/>
        <button type="submit">save</button>
        <br/>
        <br/>
      </form>
    </div>
  )
}

export default EditAccount