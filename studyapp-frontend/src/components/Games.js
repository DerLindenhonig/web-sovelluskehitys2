import React from 'react'
import { Card } from 'react-bootstrap'
import imageToRender from '../assets/image0 (1).jpeg'
import imageToRender1 from '../assets/cards.png'
import { Link } from 'react-router-dom'

const Games = ({ blog }) => {

  if(!blog) {
    return null
  }

  return (
    <div>
      <br/>
      <h1>Games</h1>
      <br/>
      <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src={imageToRender1} />
        <Card.Body>
          <Card.Title>Translate-Word</Card.Title>
          <Link to={`/quiz/${blog.id}`}>Play game</Link>
        </Card.Body>
      </Card>
      <br/>
      <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src={imageToRender} />
        <Card.Body>
          <Card.Title>Writing</Card.Title>
          <Link to={`/writing/${blog.id}`}>Play game</Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Games