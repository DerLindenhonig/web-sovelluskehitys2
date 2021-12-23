import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [user, setUser] = useState(null)
  const [categories] = useState(['English', 'German', 'French', 'Finnish', 'Swedish', 'Russian', 'Korean', 'Japanese', 'Chinese'])
  const [category, setCategory] = useState('')
  const [categories2] = useState(['English', 'German', 'French', 'Finnish', 'Swedish', 'Russian', 'Korean', 'Japanese', 'Chinese', 'other'])
  const [category2, setCategory2] = useState('')

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

  let index = 0
  const handleChange = (e) => {
    index = e.target.value
    setCategory(categories[index])
  }

  let index2 = 0
  const handleChange2 = (e) => {
    index2 = e.target.value
    setCategory2(categories2[index2])
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

    if(category === 'Select language'){
      setCategory('other')
    }
    if(category2 === 'Select language'){
      setCategory2('other')
    }

    createBlog({
      title: newTitle,
      author: user.username,
      url: newUrl,
      status: newStatus,
      category: category,
      category2: category2
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
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Add title" id='title' value={newTitle} onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Add description" id='url' value={newUrl} onChange={handleUrlChange}/>
        </Form.Group>
        <Form.Select aria-label="Default select example" onChange={handleChange}>
          <option>Select language</option>
          {categories
            .map((filteredCategories, index) => (
              <option value={index} key={filteredCategories}>{filteredCategories}</option>
            ))}
        </Form.Select> for <Form.Select aria-label="Default select example" onChange={handleChange2}>
          <option>Select language</option>
          {categories2
            .map((filteredCategories, index) => (
              <option value={index} key={filteredCategories}>{filteredCategories}</option>
            ))}
        </Form.Select> speakers
        <br/>
        <br/>
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
        <br/>
        <br/>
      </Form>
    </div>
  )
}

export default NewBlogForm