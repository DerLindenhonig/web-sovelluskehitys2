import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'

const NewCardForm = ({ createCard, blogId }) => {
  const [newWord, setNewWord] = useState('')
  const [newTranslate, setNewTranslate] = useState('')
  const [newExamples, setNewExamples] = useState('')

  const handleWordChange = (event) => {
    setNewWord(event.target.value)
  }

  const handleTranslateChange = (event) => {
    setNewTranslate(event.target.value)
  }

  const handleExampleChange = (event) => {
    setNewExamples(event.target.value)
  }

  const handleAddWord = (event) => {
    event.preventDefault()

    createCard({
      word: newWord,
      translate: newTranslate,
      examples: newExamples,
      blogId: blogId
    })

    setNewWord('')
    setNewTranslate('')
    setNewExamples('')
  }

  return (
    <div>
      <h2>Create new card</h2>
      <Form onSubmit={handleAddWord}>
        <Form.Group className="mb-3">
          <Form.Label>Word</Form.Label>
          <Form.Control type="text" placeholder="Add word" id='word' value={newWord} onChange={handleWordChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Translate</Form.Label>
          <Form.Control type="text" placeholder="Add translate" id='translate' value={newTranslate} onChange={handleTranslateChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Example</Form.Label>
          <Form.Control type="text" placeholder="Add example" id='example' value={newExamples} onChange={handleExampleChange}/>
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  )
}

export default NewCardForm