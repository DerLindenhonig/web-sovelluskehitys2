import React, { useState } from 'react'
import blogService from '../services/blogs'
//import cardService from '../services/cards'
import Cards from './Cards'
import Togglable from './Togglable'
import EditBlogForm from './EditBlogForm'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, setRefreshedBlogs, setBlogs, blogs }) => {
  if(!blog) {
    return null
  }

  const [like, setLike] = useState(false)
  //const [copyCards, setCopyCards] = useState(false)

  const DeleteBlogBtn = () => {
    if (blog.user.username === user.username) {
      return <button id='delete' onClick={deleteBlog}>delete blog</button>
    } else {
      return null
    }
  }

  const EditBlogBtn = () => {
    if (blog.user.username === user.username) {
      return (
        <Togglable buttonLabel='edit blog'>
          <EditBlogForm editBlog={handleEditBlog} likes={blog.likes}/>
        </Togglable>
      )
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

  /*const AddToMyListBtn = () => {
    if (blog.user.username !== user.username) {
      //setCopyCards(true)
      return (
        <button onClick={AddToMyList}>add to my collection</button>
      )
    } else {
      return null
    }
  }*/

  /*const CopyCards = async event => {
    event.preventDefault()

    for(let i = 0; i < blog.cards.length; i++) {
      const newCard = {
        word: blog.cards[i].word,
        translate: blog.cards[i].translate,
        examples: blog.cards[i].examples,
        progress: 0
      }

      await cardService.create(newCard)
      //const allCards = await cardService.getAll()
      //setRefreshedBlogs(allCards)
    }
  }*/

  /*const AddToMyList = async event => {
    event.preventDefault()

    console.log('blog.cards: ' + blog.cards)

    const newBlog = {
      likes: 0,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      cards: blog.cards,
      user: user,
    }
    await blogService.create(newBlog)
    const allBlogs = await blogService.getAll()
    setRefreshedBlogs(allBlogs)

    /*
    for(let i = 0; i < blog.cards.length; i++) {
      console.log('blog.card: ' + blog.cards[i].word)
      const newCard = {
        word: blog.cards[i].word,
        translate: blog.cards[i].translate,
        examples: blog.cards[i].examples,
      }
      await cardService.create(newCard)
    }*/
  //}*/

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

    /*const newUser = {
      name: user.name,
      username: user.username,
      likedBlogs: newBlog.id,
    }

    await userService.update(user.id, newUser)*/
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
      return <button id='like' onClick={addLike}>like</button>
    } else {
      return <button id='like' onClick={removeLike}>remove like</button>
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
      <br/>
      <div>creator: {blog.author}</div>
      <div>description: {blog.url}</div>
      <div>likes: {blog.likes}<Liking/></div>
      <EditBlogBtn/>
      <DeleteBlogBtn/>
      <br/>
      <Cards blog={blog} user={user} setRefreshedBlogs={setRefreshedBlogs} blogs={blogs}/>
      <br/>
      <Game/>
    </div>
  )
}

export default Blog