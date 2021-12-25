import React from 'react'
import blogService from '../services/blogs'
import Cards from './Cards'
import Togglable from './Togglable'
import EditBlogForm from './EditBlogForm'
import {Link, Redirect} from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: lightseagreen;
  font-size: 1.3em;
  padding: 0.15em 0.5em;
  border: 0px solid Black;
  border-radius: 3px;
  font-weight: bold;
  background: ${props => props.primary ? 'white' : 'lightseagreen'};
  color: ${props => props.primary ? 'lightseagreen' : 'white'};
`

const Blog = ({ blog, user, setRefreshedBlogs, setBlogs, blogs, users }) => {

  if(!user) {
    return <Redirect to="/login" />
  }

  if(!blog) {
    return null
  }

  console.log(user)
  //const [like, setLike] = useState(false)

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
        <Togglable buttonLabel='edit' image={false}>
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

  /*const addLike = async event => {
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
  }*/

  /*const removeLike = async event => {
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
  }*/

  /*const Liking = () => {
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
  }*/

  const Game = () => {
    return (
      <div>
        <Link to={`/games/${blog.id}`}><Button>Play games</Button></Link>
      </div>
    )
  }

  return (
    <div>
      <br/>
      <h2>{blog.title}</h2>
      <div><strong>Status:</strong> {blog.status}</div>
      <div><strong>Created by</strong> {blog.author}</div>
      <div><strong>Description:</strong> {blog.url}</div>
      <div><strong>Category:</strong> {blog.category} for {blog.category2} speakers</div>
      <br/>
      <EditBlogBtn/>
      <br/>
      <Cards blog={blog} user={user} setRefreshedBlogs={setRefreshedBlogs} blogs={blogs} users={users}/>
      <GameBtn/>
      <br/>
    </div>
  )
}

export default Blog