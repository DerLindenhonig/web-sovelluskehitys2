import React from 'react'
import {Link} from 'react-router-dom'
import Togglable from './Togglable'
import EditAccount from './EditAccount'
import userService from '../services/users'

const User = ({ user, setUsers, users, thisUserUsername }) => {
  if (user === undefined) {
    return null
  }

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
                      .filter(blog => blog.status === 'public')
                      .filter(blog => blog.author === user.username)
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

  const EditUserBtn = () => {
    if(user.username === thisUserUsername) {
      return (
        <Togglable buttonLabel='Edit my account' image={false}>
          <EditAccount user={user} editUser={handleEditUser}/>
        </Togglable>
      )
    } else return null
  }

  return (
    <div>
      <br/>
      <br/>
      <h3>{user.name}</h3>
      <p>{user.username}</p>
      <img src={user.avatar} width='150px'/>
      <br/>
      <br/>
      <EditUserBtn/>
      <br/>
      <h4>Top 10 word lists:</h4>
      <Wordlists/>
    </div>
  )
}

export default User