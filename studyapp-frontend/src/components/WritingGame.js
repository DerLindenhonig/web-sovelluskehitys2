import React, {useEffect, useState} from 'react'
import {Button, FormControl, InputGroup} from 'react-bootstrap'
import cardService from '../services/cards'

const WritingGame = ({ blog }) => {

  if(!blog) {
    console.log(blog)
    return null
  }

  const [allCards, setAllCards] = useState([])
  const [newAnswer, setNewAnswer] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [start, setStart] = useState(false)
  let [record, setRecord] = useState(null)

  useEffect(() => {
    cardService.getAll()
      .then(cards =>
        setAllCards(cards)
      )
  }, [])

  const cards = []
  for(let i = 0; i < allCards.length; i++) {
    if(blog.id === allCards[i].blog.id) {
      cards.push(allCards[i])
    }
  }

  const changeQuestion = () => {
    setStart(true)
    const randQ = Math.floor(Math.random() * cards.length)
    setNewQuestion(cards[randQ])
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

      const newObject = {
        word: newQuestion.word,
        translate: newQuestion.translate,
        examples: newQuestion.examples,
        progress: newQuestion.progress + 2
      }
      cardService.update(newQuestion.id, newObject)
    } else {
      console.log('WRONG!')
      const newObject = {
        word: newQuestion.word,
        translate: newQuestion.translate,
        examples: newQuestion.examples,
        progress: newQuestion.progress - 1
      }
      cardService.update(newQuestion.id, newObject)
    }
    changeQuestion()
  }

  const handleStartBtn = () => {
    changeQuestion()
  }

  const ButtonComponent = () => {
    if(start === false) {
      return (
        <Button onClick={handleStartBtn}>Start</Button>
      )
    } else return (
      <Button onClick={handleAnswerBtn}>Answer</Button>
    )
  }

  if(blog.cards.length > 3) {
    return (
      <div>
        <br/>
        <h3>Writing</h3>
        <br/>
        <br/>
        <div>right answers: {record}</div>
        <br/>
        <h4>{newQuestion.translate}</h4>
        <InputGroup className="mb-3"><FormControl onChange={handleAnswerChange} value={newAnswer}/></InputGroup>
        <ButtonComponent/>
      </div>
    )
  } else return (
    <div>Need at least 4 cards to play!</div>
  )
}

export default WritingGame