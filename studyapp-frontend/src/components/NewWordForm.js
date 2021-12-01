import React, { useState } from 'react'

const NewWordForm = ({ createCard, blogId }) => {
  const [newWord, setNewWord] = useState('')
  const [newTranslate, setNewTranslate] = useState('')
  const [newExample, setNewExample] = useState('')

  const handleWordChange = (event) => {
    setNewWord(event.target.value)
  }

  const handleTranslateChange = (event) => {
    setNewTranslate(event.target.value)
  }

  const handleExampleChange = (event) => {
    setNewExample(event.target.value)
  }

  const handleAddWord = (event) => {
    event.preventDefault()

    createCard({
      word: newWord,
      translate: newTranslate,
      example: newExample,
      blogId: blogId
    })

    setNewWord('')
    setNewTranslate('')
    setNewExample('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddWord}>
        word: <input id='word' value={newWord} onChange={handleWordChange}/> <br></br>
        translate: <input id='translate' value={newTranslate} onChange={handleTranslateChange}/> <br></br>
        example: <input id='example' value={newExample} onChange={handleExampleChange}/> <br></br>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewWordForm