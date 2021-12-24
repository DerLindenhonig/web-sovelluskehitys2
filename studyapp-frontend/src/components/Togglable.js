import React, {useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'
import imageToRender from '../assets/edit.png'
import imageToRenderAdd from '../assets/add.png'
import styled from 'styled-components'
import {Image} from 'react-bootstrap'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  padding: 0.15em 0.5em;
  border: 1px solid black;
  border-radius: 5px;
`

const AddButton = styled.button`
  background: slateblue;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  padding: 0.25em 0.6em;
  border: 0px solid Black;
  border-radius: 5px;
`

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const ImageComponent = ({ image }) => {
    if(image === false) {
      return <Image src={imageToRender}/>
    } else {
      return <Image src={imageToRenderAdd}/>
    }
  }

  const Buttons = ({ image }) => {
    if(image === false) {
      return <Button size="sm" variant="light" onClick={toggleVisibility}><ImageComponent image={props.image}/> {props.buttonLabel}</Button>
    } else {
      return <AddButton size="sm" variant="light" onClick={toggleVisibility}><ImageComponent image={props.image}/> {props.buttonLabel}</AddButton>
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Buttons image={props.image}/>
      </div>
      <div style={showWhenVisible}>
        <Button size="sm" variant="outline-dark" onClick={toggleVisibility}>cancel</Button>
        <br/>
        <br/>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable