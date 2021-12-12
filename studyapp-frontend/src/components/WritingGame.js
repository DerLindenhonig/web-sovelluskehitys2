import React, {useState} from 'react'
import {Button, FormControl, InputGroup} from 'react-bootstrap'

const WritingGame = ({ blog, cards }) => {

  if(!blog) {
    return null
  }

  const [newAnswer, setNewAnswer] = useState('')
  const [newQuestion, setNewQuestion] = useState('Question')

  const changeQuestion = () => {
    const randQ = Math.floor(Math.random() * cards.length)
    setNewQuestion(cards[randQ])
    console.log(newQuestion)
  }

  const handleAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }

  const handleAnswerBtn = () => {
    console.log(newAnswer)
    setNewAnswer('')
    if(newAnswer === newQuestion.translate) {
      console.log('RIGHT!')
    } else {
      console.log('WRONG!')
    }
    changeQuestion()
  }

  if(blog.cards.length > 3) {
    return (
      <div>
        <p>Write a word:</p>
        <h3>{newQuestion.translate}</h3>
        <InputGroup className="mb-3"><FormControl onChange={handleAnswerChange} value={newAnswer}/></InputGroup>
        <Button onClick={handleAnswerBtn}>Answer</Button>
      </div>
    )
  } else return (
    <div>Need at least 4 cards to play!</div>
  )
}

export default WritingGame