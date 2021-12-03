import React  from 'react'

const User = ({ user, blogs }) => {
  if (user === undefined) {
    return null
  }

  console.log(user.blogs)
  console.log(user.likedBlogs)

  const likedBlogs = []

  for(let i = 0; i < user.likedBlogs.length; i++) {
    for(let a = 0; a < blogs.length; a++) {
      if(user.likedBlogs[i] === blogs[a].id) {
        likedBlogs.push(blogs[a])
      }
    }
  }

  console.log(user.blogs)
  console.log(likedBlogs)

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.username}</p>
      <h3>blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>{blog.title}</li>)}
      </ul>
      <h3>liked blogs</h3>
      <ul>
        {likedBlogs.map(blog =>
          <li key={blog.title}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User