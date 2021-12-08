import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

const Filter = ({ onInputChange, filter }) => {
  return (
    <div>
      <InputGroup>
        <FormControl placeholder="Search" aria-label="Search" aria-describedby="Search" onChange={onInputChange} value={filter}/>
      </InputGroup>
    </div>
  )
}

export default Filter