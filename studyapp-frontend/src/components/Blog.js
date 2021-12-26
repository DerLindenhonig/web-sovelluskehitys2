import React from 'react'
import blogService from '../services/blogs'
import Cards from './Cards'
import Togglable from './Togglable'
import EditBlogForm from './EditBlogForm'
import {Link, Redirect} from 'react-router-dom'
import styled from 'styled-components'
//import {Card} from "react-bootstrap";

const Button = styled.button`
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
        <Togglable buttonLabel='edit wordlist' image={false}>
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
      {users
        .filter(user => user.username === blog.author)
        .map(user =>
          <div key={user.id}><strong>Created by</strong> <Link to={`/users/${user.id}`}>{blog.author}</Link></div>
        )}
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