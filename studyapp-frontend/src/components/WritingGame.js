import React, {useState} from 'react'
import {Button, FormControl, InputGroup} from 'react-bootstrap'

const WritingGame = ({ blog, cards }) => {

  if(!blog) {
    return null
  }

  const [newAnswer, setNewAnswer] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [start, setStart] = useState(false)
  let [record, setRecord] = useState(null)

  const changeQuestion = () => {
    setStart(true)
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
    if(newAnswer === newQuestion.word) {
      console.log('RIGHT!')
      record++
      setRecord(record)
    } else {
      console.log('WRONG!')
    }
    changeQuestion()
  }


  const ButtonComponent = () => {
    if(start === false) {
      return (
        <Button onClick={handleAnswerBtn}>Start</Button>
      )
    } else return (
      <Button onClick={handleAnswerBtn}>Answer</Button>
    )
  }

  if(blog.cards.length > 3) {
    return (
      <div>
        <div>right answers: {record}</div>
        <h3>{newQuestion.translate}</h3>
        <InputGroup className="mb-3"><FormControl onChange={handleAnswerChange} value={newAnswer}/></InputGroup>
        <ButtonComponent/>
      </div>
    )
  } else return (
    <div>Need at least 4 cards to play!</div>
  )
}

export default WritingGame