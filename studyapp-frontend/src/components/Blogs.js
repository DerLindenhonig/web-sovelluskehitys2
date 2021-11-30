import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'

const Blogs = ({ user, blogs, setRefreshedBlogs, setBlogs, setMessage }) => {

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

  if(blogs === undefined) {
    return null
  }

  return (
    <div>
      <h2>Add new</h2>
      <Togglable buttonLabel='create new blog'>
        <NewBlogForm createBlog={handleAddBlog}/>
      </Togglable>

      <h2>Blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          setRefreshedBlogs={setRefreshedBlogs}
          user={user}
        />
      )}
    </div>
  )
}

export default Blogs