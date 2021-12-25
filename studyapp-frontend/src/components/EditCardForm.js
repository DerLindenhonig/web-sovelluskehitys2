import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import styled from 'styled-components'

const EditButton = styled.button`
  background: slateblue;
  font-size: 1em;
  font-weight: bold;
  color: white;
  padding: 0.15em 0.5em;
  border: 0px solid Black;
  border-radius: 5px;
`

const EditCardForm = ({ editCard, card }) => {
  const [newWord, setNewWord] = useState(card.word)
  const [newTranslate, setNewTranslate] = useState(card.translate)
  const [newExamples, setNewExamples] = useState(card.examples)

  const handleWordChange = (event) => {
    setNewWord(event.target.value)
  }

  const handleTranslateChange = (event) => {
    setNewTranslate(event.target.value)
  }

  const handleExampleChange = (event) => {
    setNewExamples(event.target.value)
  }

  const handleEditCard = (event) => {
    event.preventDefault()

    editCard(card,{
      word: newWord,
      translate: newTranslate,
      examples: newExamples,
      progress: card.progress
    })

    setNewWord('')
    setNewTranslate('')
    setNewExamples('')
  }

  return (
    <div>
      <h5>Edit card</h5>
      <form onSubmit={handleEditCard}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Edit word" id='wordEdit' defaultValue={newWord} onChange={handleWordChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Translate</Form.Label>
          <Form.Control type="text" placeholder="Edit translate" id='translateEdit' defaultValue={newTranslate} onChange={handleTranslateChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Example</Form.Label>
          <Form.Control type="text" placeholder="Edit example" id='examplesEdit' defaultValue={newExamples} onChange={handleExampleChange}/>
        </Form.Group>
        <EditButton type="submit">save</EditButton>
        <br/><br/>
      </form>
    </div>
  )
}

export default EditCardForm