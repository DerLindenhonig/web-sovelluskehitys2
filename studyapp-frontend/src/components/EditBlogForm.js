import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

const EditBlogForm = ({ editBlog, likes, user }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newStatus, setNewStatus] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleEditBlog = (event) => {
    event.preventDefault()

    editBlog({
      title: newTitle,
      url: newUrl,
      author: user.username,
      likes: likes,
      status: newStatus
    })

    setNewTitle('')
    setNewUrl('')
  }

  const handleChangeToPrivate = () => {
    setNewStatus('private')
  }

  const handleChangeToPublic = () => {
    setNewStatus('public')
  }

  return (
    <div>
      <h4>Edit:</h4>
      <form onSubmit={handleEditBlog}>

        <Form.Group className="mb-3" controlId="EditInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Edit title" id='title' value={newTitle} onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="EditInput3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Edit description" id='url' value={newUrl} onChange={handleUrlChange}/>
        </Form.Group>
        <div>
          <Form.Check
            inline
            onChange={handleChangeToPrivate}
            label="Private"
            name="group1"
            type='radio'
          />
          <Form.Check
            inline
            onChange={handleChangeToPublic}
            label="Public"
            name="group1"
            type='radio'
          />
        </div>
        <button type="submit">save</button>

      </form>
    </div>
  )
}

export default EditBlogForm