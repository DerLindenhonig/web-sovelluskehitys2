import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  if (!users) {
    return null
  }

  return (
    <div>
      <br/>
      <h3>Users</h3>
      <br/>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <h4>name</h4>
            </td>
            <td>
              <h4>wordlists</h4>
            </td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users