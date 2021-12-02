import React, { useState } from 'react'

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
      <h2>Create new blog</h2>
      <form onSubmit={handleAddWord}>
        word: <input id='word' value={newWord} onChange={handleWordChange}/> <br></br>
        translate: <input id='translate' value={newTranslate} onChange={handleTranslateChange}/> <br></br>
        example: <input id='example' value={newExamples} onChange={handleExampleChange}/> <br></br>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewCardForm