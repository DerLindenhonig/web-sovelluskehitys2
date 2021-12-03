import React from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserPage = ({ blogs, setBlogs, setMessage, user }) => {

  if (blogs === undefined) {
    return null
  }

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

  return (
    <div>
      <h2>Add new</h2>
      <Togglable buttonLabel='create new blog'>
        <NewBlogForm createBlog={handleAddBlog}/>
      </Togglable>

      <h2>My blogs</h2>
      <Table striped>
        <tbody>
          {myBlogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.likes}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2>Liked blogs</h2>
    </div>
  )
}

export default UserPage