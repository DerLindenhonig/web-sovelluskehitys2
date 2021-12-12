import React from 'react'

const WritingGame = ({ blog }) => {

  if(!blog) {
    return null
  }

  return (
    <div>Write word</div>
  )

}

export default WritingGame