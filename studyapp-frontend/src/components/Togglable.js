import React, {useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'
import imageToRender from '../assets/edit.png'
import imageToRenderAdd from '../assets/add.png'
import styled from 'styled-components'
import {Image} from 'react-bootstrap'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  //margin: 1em;
  padding: 0.15em 0.5em;
  border: 1px solid Black;
  border-radius: 3px;
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

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button size="sm" variant="light" onClick={toggleVisibility}><ImageComponent image={props.image}/> {props.buttonLabel}</Button>
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