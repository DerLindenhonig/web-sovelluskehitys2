import React from 'react'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import imageToRender from '../assets/image-quiz.png'
import imageToRender1 from '../assets/image-writing.png'

const Games = ({ blog }) => {

  if(!blog) {
    return null
  }

  return (
    <div>
      <br/>
      <h1>Games</h1>
      <br/>
      <Link to={`/quiz/${blog.id}`}>
        <Image src={imageToRender} style={{ width: '10rem' }}/>
      </Link>
      <br/>
      <br/>
      <Link to={`/writing/${blog.id}`}>
        <Image src={imageToRender1} style={{ width: '10rem' }}/>
      </Link>
    </div>
  )
}

export default Games