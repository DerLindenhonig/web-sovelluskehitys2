import React, { useState } from 'react'

const EditCardForm = ({ editCard, card }) => {
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

  const handleEditCard = (event) => {
    event.preventDefault()

    editCard(card,{
      word: newWord,
      translate: newTranslate,
      examples: newExamples,
    })

    setNewWord('')
    setNewTranslate('')
    setNewExamples('')
  }

  return (
    <div>
      <h2>Edit blog</h2>
      <form onSubmit={handleEditCard}>
        word: <input id='wordEdit' value={newWord} onChange={handleWordChange}/> <br></br>
        translate: <input id='translateEdit' value={newTranslate} onChange={handleTranslateChange}/> <br></br>
        example: <input id='examplesEdit' value={newExamples} onChange={handleExampleChange}/> <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default EditCardForm