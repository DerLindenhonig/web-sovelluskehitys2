import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

const EditBlogForm = ({ editBlog, likes, blog }) => {
  const [newTitle, setNewTitle] = useState(blog.title)
  const [newUrl, setNewUrl] = useState(blog.url)
  const [newStatus, setNewStatus] = useState(blog.status)
  const [categories] = useState(['English', 'German', 'French', 'Finnish', 'Swedish', 'Russian', 'Korean', 'Japanese', 'Chinese', 'other'])
  const [category, setCategory] = useState(blog.category)

  let index = 0
  const handleChange = (e) => {
    index = e.target.value
    setCategory(categories[index])
    console.log(category)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleEditBlog = (event) => {
    event.preventDefault()
    if(newUrl === '') {
      setNewUrl(blog.url)
    }
    if(newStatus === '') {
      setNewStatus(blog.status)
    }

    editBlog({
      title: newTitle,
      url: newUrl,
      author: blog.author,
      likes: likes,
      status: newStatus,
      category: category
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

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Edit title" id='title' defaultValue={newTitle} onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Edit description" id='url' defaultValue={newUrl} onChange={handleUrlChange}/>
        </Form.Group>
        <Form.Select aria-label="Default select example" onChange={handleChange}>
          <option>Select category</option>
          {categories
            //.filter(category => category.toLowerCase().includes(filter.toLowerCase()))
            .map((filteredCategories, index) => (
              <option value={index} key={filteredCategories}>{filteredCategories}</option>
            ))}
        </Form.Select>
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
        <button type="submit">save</button>

      </form>
    </div>
  )
}

export default EditBlogForm