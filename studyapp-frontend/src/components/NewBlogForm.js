import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'

const NewBlogForm = ({ createBlog }) => {
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

  const handleAddBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
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
      <Form onSubmit={handleAddBlog}>
        <Form.Group className="mb-3" controlId="CreateInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Add title" id='title' value={newTitle} onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="CreateInput2">
          <Form.Label>Creator</Form.Label>
          <Form.Control type="text" placeholder="Add creator" id='author' value={newAuthor} onChange={handleAuthorChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="CreateInput3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Add description" id='url' value={newUrl} onChange={handleUrlChange}/>
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
        <br/>
        <Button variant="dark" type="submit">Add</Button>
      </Form>
    </div>
  )
}

export default NewBlogForm