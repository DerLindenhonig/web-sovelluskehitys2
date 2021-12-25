import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {Convert} from 'mongo-image-converter'

const EditAccount = ({ user, editUser }) => {
  const [newUsername, setNewUsername] = useState(user.username)
  const [newName, setNewName] = useState(user.name)
  const [imageFile, setImageFile] = useState('')

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
      avatar: imageFile
    })

    setNewUsername('')
    setNewName('')
  }

  const convertImage = async (event) => {
    event.preventDefault()
    try {
      const convertedImage = await Convert(imageFile)
      if( convertedImage ){
        console.log(convertedImage)
        setImageFile(convertedImage)
        // after this pass it to the backend using your fav API,
      } else{
        console.log('The file is not in format of image/jpeg or image/png')
      }
    }
    catch (error) {
      console.warn(error.message)
    }
  }

  return (
    <div>
      <h4>Edit</h4>
      <form onSubmit={handleEditBlog}>
        <div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange = {(e) => setImageFile( e.target.files[0] ) } />
          </Form.Group>
        </div>
        <button onClick={convertImage} type="submit">save</button>
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