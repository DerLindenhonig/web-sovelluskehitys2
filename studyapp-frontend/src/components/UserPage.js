import React, {useState} from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import {Card, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Filter from './Filter'

const UserPage = ({ blogs, setBlogs, setMessage, user }) => {

  if (blogs === undefined) {
    return null
  }

  const [filter, setFilter] = useState('')
  const [categories] = useState(['English', 'German', 'French', 'Finnish', 'Swedish', 'Russian', 'Korean', 'Japanese', 'Chinese', 'other'])
  let [category, setCategory] = useState('English')

  const handleChange = (e) => {
    index = e.target.value
    setCategory(categories[index])
  }
  let index = 0

  const handleAddBlog = (blogObject) => {
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage({
            content: `new blog ${blogObject.title} by ${blogObject.author} was added`,
            type: 'successMessage'
          })
          setTimeout(() => setMessage(null), 5000)
        })
    } catch (error) {
      setMessage({
        content: 'blog was not added',
        type: 'errorMessage'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const myBlogs = []
  for(let i = 0; i < blogs.length; i++) {
    if(user.username === blogs[i].user.username) {
      myBlogs.push(blogs[i])
    }
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  const FilterBlogs = () => {
    return (
      <Row xs={3} md={4} className="g-4" >
        {myBlogs
          .sort((a, b) => b.likes - a.likes)
          .filter(blog => blog.title?.toLowerCase().includes(filter.toLowerCase()))
          .filter(blog => blog.category === category)
          .map(blog =>
            <Col key={blog.id}>
              <Card className="mb-4" border="secondary">
                <Card.Header>{blog.category}</Card.Header>
                <Card.Body>
                  <Card.Title><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Card.Title>
                </Card.Body>
                <Card.Text style={{ padding: '18px' }}>
                  Cards: {blog.cards.length}
                </Card.Text>
              </Card>
            </Col>
          )}
      </Row>
    )
  }

  return (
    <div>
      <br/>
      <h3>Add new</h3>
      <Togglable buttonLabel='create new wordlist'>
        <NewBlogForm createBlog={handleAddBlog}/>
      </Togglable>
      <br/>
      <h3>My word lists</h3>
      <br/>
      <Form.Select aria-label="Default select example" onChange={handleChange}>
        {categories
          .map((filteredCategories, index) => (
            <option value={index} key={filteredCategories}>{filteredCategories}</option>
          ))}
      </Form.Select>
      <br/>
      <br/>
      <Filter filter={filter} onInputChange={handleInputChange}/>
      <br/>
      <FilterBlogs/>
    </div>
  )
}

export default UserPage