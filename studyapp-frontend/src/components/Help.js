import React from 'react'
import imageToRender from '../assets/tutorial.png'
import imageToRender2 from '../assets/tutorial2.png'
import {Image} from 'react-bootstrap'

const Help = () => {
  return (
    <div>
      <br/>
      <h2>Search for card sets created by other users</h2>
      <Image src={imageToRender2}></Image>
      <br/>
      <br/>
      <h2>Create your own card sets</h2>
      <Image src={imageToRender}></Image>
      <h2>Practice by playing games</h2>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default Help