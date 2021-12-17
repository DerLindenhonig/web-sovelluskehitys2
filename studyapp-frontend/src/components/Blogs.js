import React, {useState} from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import {Card, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Filter from './Filter'

const Blogs = ({ blogs, setBlogs, setMessage, user }) => {

  const [filter, setFilter] = useState('')
  const [categories] = useState(['English', 'German', 'French', 'Finnish', 'Swedish', 'Russian', 'Korean', 'Japanese', 'Chinese', 'other'])
  let [category, setCategory] = useState('English')

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

  const handleChange = (e) => {
    index = e.target.value
    setCategory(categories[index])
  }
  let index = 0

  if (blogs === undefined) {
    return null
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  const FilterBlogs = () => {
    return (
      <Row xs={3} md={4} className="g-4" >

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .filter(blog => blog.title?.toLowerCase().includes(filter.toLowerCase()))
          .filter(blog => blog.status === 'public')
          .filter(blog => blog.category === category)
          .map(filteredBlogs => (
            <Col key={filteredBlogs.id}>
              <Card>
                <Card.Header>{filteredBlogs.category}</Card.Header>
                <Card.Body>
                  <Card.Title><Link to={`/blogs/${filteredBlogs.id}`}>{filteredBlogs.title}</Link></Card.Title>
                </Card.Body>
                <Card.Text style={{ padding: '18px' }}>
                  Cards: {filteredBlogs.cards.length}
                </Card.Text>
              </Card>
            </Col>
          ))}
      </Row>
    )
  }

  return (
    <div>
      <br/>
      <h3>Add new</h3>
      <Togglable buttonLabel='create new wordlist'>
        <NewBlogForm createBlog={handleAddBlog} user={user}/>
      </Togglable>
      <br/>
      <h3>All wordlists</h3>
      <br/>
      <Form.Select aria-label="Default select example" onChange={handleChange}>
        {categories
          .map((filteredCategories, index) => (
            <option value={index} key={filteredCategories} >{filteredCategories}</option>
          ))}
      </Form.Select>
      <br/>
      <br/>
      <Filter filter={filter} onInputChange={handleInputChange}/>
      <br/>
      <FilterBlogs/>
      <br/>
    </div>
  )
}

export default Blogs