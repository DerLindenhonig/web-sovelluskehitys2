import React from 'react'
import {Link} from 'react-router-dom'
import Togglable from './Togglable'
import EditAccount from './EditAccount'
import userService from '../services/users'

const User = ({ user, blogs, setUsers, users }) => {
  if (user === undefined) {
    return null
  }

  //console.log(user.blogs)
  //console.log(user.likedBlogs)

  const likedBlogs = []

  for(let i = 0; i < user.likedBlogs.length; i++) {
    for(let a = 0; a < blogs.length; a++) {
      if(user.likedBlogs[i] === blogs[a].id) {
        likedBlogs.push(blogs[a])
      }
    }
  }

  //console.log(user.blogs)
  //console.log(user.blogs.length)

  const Wordlists = () => {
    if(user.blogs.length === 0) {
      return (
        <p>There is no single wordlist created yet!</p>
      )
    } else if (user.blogs.length !== 0){
      return (
        <table>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    {user.blogs
                      .slice(0, 10)
                      .sort((a, b) => b.likes - a.likes)
                      .map(blog =>
                        <tr key={blog.title}>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </tr>)}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  }

  const handleEditUser= (userObject) => {
    userService
      .update(user.id, userObject)
      .then(returnedUser => {
        setUsers(users.concat(returnedUser))
        //const allUsers= userService.getAll()
        //setRefreshedBlogs(allUsers)
      })
  }

  return (
    <div>
      <br/>
      <br/>
      <h3>{user.name}</h3>
      <p>{user.username}</p>
      <Togglable buttonLabel='Edit my account' image={false}>
        <EditAccount user={user} editUser={handleEditUser}/>
      </Togglable>
      <br/>
      <br/>
      <h4>Top 10 word lists:</h4>
      <Wordlists/>
    </div>
  )
}

export default User