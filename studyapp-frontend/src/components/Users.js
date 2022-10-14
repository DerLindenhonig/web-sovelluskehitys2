import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import userService from '../services/users'
import Filter from './Filter'

const Users = () => {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  if (!users) {
    return null
  }

  const UserLevel = ({ user }) => {
    const levels = [0, 10, 30, 60, 100, 150, 210, 270, 350]
    let userLevel = 0

    if(user.level === undefined) user.level = 0

    for(let i = 0; i < levels.length; i++) {
      if(user.level > levels[i]) userLevel = i
    }
    return (userLevel)
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <br/>
      <h4>Users</h4>
      <br/>
      <Filter filter={filter} onInputChange={handleInputChange}/>
      <br/>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <h5>Name</h5>
            </td>
            <td>
              <h5>Level</h5>
            </td>
          </tr>
          {users
            .sort((a, b) => b.level- a.level)
            .filter(user => user.username?.toLowerCase().includes(filter.toLowerCase()))
            .map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  <UserLevel user={user}/>
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users