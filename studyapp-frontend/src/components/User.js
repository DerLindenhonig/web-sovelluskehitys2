import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import EditAccount from './EditAccount'
import userService from '../services/users'
import { Image, ProgressBar } from 'react-bootstrap'

const User = ({ user, setUsers, users, thisUserUsername }) => {
  if (user === undefined) {
    return null
  }

  console.log(user)

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

  const LevelBar = () => {
    const levels = [0, 10, 30, 60, 100, 150, 210, 270, 350]
    let userLevel = 0

    if(user.level === undefined) {
      user.level = 0
    }

    for(let i = 0; i < levels.length; i++) {
      if(user.level > levels[i]) {
        userLevel = i
      }
    }

    return (
      <div style={{ width: 250 }}>
        Level: {userLevel}
        <ProgressBar animated striped variant="info" now={user.level} min={0} label={`${user.level} / ${levels[userLevel+1]}`} max={levels[userLevel+1]}/>
      </div>
    )
  }

  return (
    <div>
      <br/>
      <br/>
      <h3>{user.name}</h3>
      <p>{user.username}</p>
      <Image src={user.avatar} width='150px' height='150px' rounded/>
      <br/>
      <br/>
      <EditUserBtn/>
      <br/>
      <LevelBar/>
      <br/>
      <h4>Top 10 word lists:</h4>
      <Wordlists/>
    </div>
  )
}

export default User