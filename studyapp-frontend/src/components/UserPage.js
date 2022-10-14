import React, { useState } from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Filter from './Filter'

const UserPage = ({ blogs, setBlogs, setMessage, user, users }) => {

  if (blogs === undefined) {
    return <div>No word lists found</div>
  }

  const [filter, setFilter] = useState('')
  const [categories] = useState(['All', 'Arabic', 'Chinese', 'Danish', 'Dutch', 'English', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'Danish', 'French', 'Finnish', 'Japanese', 'Kazakh', 'Korean', 'Norwegian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Turkish', 'other'])
  let [category, setCategory] = useState('All')

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

  /*const myBlogs = []
  for(let i = 0; i < blogs.length; i++) {
    if(user.username === blogs[i].user.username) {
      myBlogs.push(blogs[i])
    }
  }*/

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  /*const CardsLenght = ({ blog }) => {
    if(blog.user.username === blog.author) {
      return <div>Cards: {blog.cards.length}</div>
    } else if (blog.user.username !== blog.author){
      console.log('value')
      blog.cards.forEach(value => {
        if(value !== null) {
          console.log(value)
        }
      })
      return <div>Cards: {blog.cards.length/2}</div>
    }
  }*/

  const FilterBlogs = () => {
    if (category !== 'All') {
      return (
        <Row xs={3} md={4} className="g-4" >
          {blogs
            .sort((a, b) => a.title.localeCompare(b.title))
            .filter(blog => blog.title?.toLowerCase().includes(filter.toLowerCase()))
            .filter(blog => blog.category === category)
            .filter(blog => blog.user.name === user.name)
            .map(blog =>
              <Col key={blog.id}>
                <Card className="mb-4" border="secondary">
                  <Card.Header>{blog.category}</Card.Header>
                  <Card.Body>
                    <Card.Title><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Card.Title>
                    {users
                      .filter(user => user.username === blog.author)
                      .map(user =>
                        <div key={user.id}><em>by <Link to={`/users/${user.id}`}>{blog.author}</Link></em></div>
                      )}
                    <br/>
                    Cards: {blog.cards.length}
                  </Card.Body>
                </Card>
              </Col>
            )}
        </Row>
      )
    } else {
      return (
        <Row xs={3} md={4} className="g-4" >
          {blogs
            .sort((a, b) => a.title.localeCompare(b.title))
            .filter(blog => blog.title?.toLowerCase().includes(filter.toLowerCase()))
            .filter(blog => blog.user.name === user.name)
            .map(blog =>
              <Col key={blog.id}>
                <Card className="mb-4" border="secondary">
                  <Card.Header>{blog.category}</Card.Header>
                  <Card.Body>
                    <Card.Title><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Card.Title>
                    {users
                      .filter(user => user.username === blog.author)
                      .map(user =>
                        <div key={user.id}><em>by <Link to={`/users/${user.id}`}>{blog.author}</Link></em></div>
                      )}
                    <br/>
                    Cards: {blog.cards.length}
                  </Card.Body>
                </Card>
              </Col>
            )}
        </Row>
      )
    }
  }

  const thisUser = user

  return (
    <div>
      <br/>
      <div>
        {users
          //.slice(0, 1)
          .filter(user => user.username === thisUser.username)
          .map(user =>
            <h3 key={user.id}>
              Hi, <Link to={`/users/${user.id}`}>{user.name}</Link>!
            </h3>
          )}
      </div>
      <br/>
      <Togglable buttonLabel='Create new wordlist'>
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