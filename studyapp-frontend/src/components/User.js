import React  from 'react'

const User = ({ user }) => {
  if (user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.username}</p>
      <h3>blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User