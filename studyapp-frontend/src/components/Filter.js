import React from 'react'

const Filter = ({ onInputChange, filter }) => {
  return (
    <div>
      search:
      <input onChange={onInputChange} value={filter} />
    </div>
  )
}

export default Filter