import React, { useState } from 'react'

const EditBlogForm = ({ editBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleEditBlog = (event) => {
    event.preventDefault()

    editBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Edit blog</h2>
      <form onSubmit={handleEditBlog}>
        title: <input id='title' value={newTitle} onChange={handleTitleChange}/> <br></br>
        author: <input id='author' value={newAuthor} onChange={handleAuthorChange}/> <br></br>
        url: <input id='url' value={newUrl} onChange={handleUrlChange}/> <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default EditBlogForm