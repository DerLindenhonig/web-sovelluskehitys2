import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

const EditBlogForm = ({ editBlog, likes }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newStatus, setNewStatus] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleEditBlog = (event) => {
    event.preventDefault()

    editBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: likes,
      status: newStatus
    })

    setNewTitle('')
    setNewAuthor('')
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
      <h2>Edit blog</h2>
      <form onSubmit={handleEditBlog}>

        <Form.Group className="mb-3" controlId="EditInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Edit title" id='title' value={newTitle} onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="EditInput2">
          <Form.Label>Creator</Form.Label>
          <Form.Control type="text" placeholder="Edit creator" id='author' value={newAuthor} onChange={handleAuthorChange}/>
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