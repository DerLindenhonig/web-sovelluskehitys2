import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [user, setUser] = useState(null)

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleAddBlog = (event) => {
    event.preventDefault()

    console.log(user)

    createBlog({
      title: newTitle,
      author: user.username,
      url: newUrl,
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
      <Form onSubmit={handleAddBlog}>
        <Form.Group className="mb-3" controlId="CreateInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Add title" id='title' value={newTitle} onChange={handleTitleChange}/>
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