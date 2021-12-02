import React, {} from 'react'
import blogService from '../services/blogs'
import Cards from './Cards'
import Togglable from './Togglable'
import EditBlogForm from './EditBlogForm'

const Blog = ({ blog, user, setRefreshedBlogs, setBlogs, blogs }) => {
  if(!blog) {
    return null
  }

  const DeleteBlogBtn = () => {
    if (blog.user.username === user.username) {
      return <button id='delete' onClick={deleteBlog}>delete blog</button>
    } else {
      return null
    }
  }

  const deleteBlog = async event => {
    event.preventDefault()

    const confirm = window.confirm(`Are you sure you want to delete "${blog.title}"?`)
    if (confirm) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      const allBlogs = await blogService.getAll()
      setRefreshedBlogs(allBlogs)
    }
  }

  const handleEditBlog = (blogObject) => {
    blogService
      .update(blog.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        const allBlogs = blogService.getAll()
        setRefreshedBlogs(allBlogs)
      })
  }

  const addLike = async event => {
    event.preventDefault()

    const newBlog = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user
    }
    await blogService.update(blog.id, newBlog)
    const allBlogs = await blogService.getAll()
    setRefreshedBlogs(allBlogs)
  }

  return (
    <div>
      <h1>Blog</h1>
      <div>title: {blog.title}</div>
      <div>author: {blog.author}</div>
      <div>url: {blog.url}</div>
      <div>likes: {blog.likes}<button id='like' onClick={addLike}>like</button></div>
      <DeleteBlogBtn/>

      <Togglable buttonLabel='edit blog'>
        <EditBlogForm editBlog={handleEditBlog} likes={blog.likes}/>
      </Togglable>

      <Cards blog={blog} user={user}/>
    </div>
  )
}

export default Blog