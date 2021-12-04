import React, { useState } from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Filter from './Filter'
//import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, setMessage }) => {

  const [filter, setFilter] = useState('')

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

  if (blogs === undefined) {
    return null
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  const FilterBlogs = () => {
    return (
      <Table striped>
        <tbody>
          {blogs.sort((a, b) => b.likes - a.likes).filter(blog => blog.title?.toLowerCase().includes(filter.toLowerCase())).map(filteredBlogs => (
            <tr key={filteredBlogs.title}>
              <td>
                <Link to={`/blogs/${filteredBlogs.id}`}>{filteredBlogs.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  return (
    <div>
      <h2>Add new</h2>
      <Togglable buttonLabel='create new blog'>
        <NewBlogForm createBlog={handleAddBlog}/>
      </Togglable>
      <h2>All blogs</h2>
      <Filter filter={filter} onInputChange={handleInputChange}/>
      <FilterBlogs/>
    </div>
  )
}

export default Blogs