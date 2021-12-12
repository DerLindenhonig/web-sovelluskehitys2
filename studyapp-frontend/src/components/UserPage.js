import React, {useState} from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Filter from './Filter'

const UserPage = ({ blogs, setBlogs, setMessage, user }) => {

  if (blogs === undefined) {
    return null
  }

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
      <Table striped>
        <tbody>
          {myBlogs
            .sort((a, b) => b.likes - a.likes)
            .filter(blog => blog.title?.toLowerCase().includes(filter.toLowerCase()))
            .map(blog =>
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
      <h3>My wordlists</h3>
      <br/>
      <Filter filter={filter} onInputChange={handleInputChange}/>
      <br/>
      <FilterBlogs/>
    </div>
  )
}

export default UserPage