import React, {useState} from 'react'
import blogService from '../services/blogs'
import Cards from './Cards'
import Togglable from './Togglable'
import EditBlogForm from './EditBlogForm'
import {Link, Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const Blog = ({ blog, user, setRefreshedBlogs, setBlogs, blogs }) => {

  if(!user) {
    return <Redirect to="/login" />
  }

  if(!blog) {
    return null
  }

  const [like, setLike] = useState(false)

  const GameBtn = () => {
    if (blog.user.username === user.username) {
      return (
        <Game/>
      )
    } else return null
  }

  const EditBlogBtn = () => {
    if (blog.user.username === user.username) {
      return (
        <Togglable buttonLabel='edit'>
          <EditBlogForm editBlog={handleEditBlog} likes={blog.likes} user={user} blog={blog}/>
        </Togglable>
      )
    } else {
      return null
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
    setLike(true)

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

  const removeLike = async event => {
    event.preventDefault()
    setLike(false)

    const newBlog = {
      likes: blog.likes - 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
    }
    await blogService.update(blog.id, newBlog)
    const allBlogs = await blogService.getAll()
    setRefreshedBlogs(allBlogs)
  }

  const Liking = () => {
    for(let i = 0; i < user.likedBlogs; i++) {
      if(user.likedBlogs[i] === blog.id) {
        setLike(true)
      } else {
        setLike(false)
      }
    }
    if(like === false) {
      return <Button size="sm" id='like' onClick={addLike}>like</Button>
    } else {
      return <Button size="sm" id='like' onClick={removeLike}>remove like</Button>
    }
  }

  const Game = () => {
    return (
      <div>
        <Link to={`/games/${blog.id}`}><button>start game</button></Link>
      </div>
    )
  }

  return (
    <div>
      <br/>
      <h2>{blog.title}</h2>
      <div>status: {blog.status}</div>
      <div>created by {blog.author}</div>
      <div>description: {blog.url}</div>
      <div>likes: {blog.likes}<Liking/></div>
      <br/>
      <EditBlogBtn/>
      <br/>
      <Cards blog={blog} user={user} setRefreshedBlogs={setRefreshedBlogs} blogs={blogs}/>
      <GameBtn/>
      <br/>
    </div>
  )
}

export default Blog