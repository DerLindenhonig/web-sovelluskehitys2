import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import cardService from '../services/cards'
import styled from 'styled-components'

const Input = styled.input.attrs(props => ({
  type: 'text',
  size: props.size || '1em',
}))`
  color: ${props => props.backgroundColor};
  //color: black;
  font-size: 1em;
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px;
  width: 500px;
  height: 40px;
`

const WritingGame = ({ blog }) => {

  if(!blog) {
    return null
  }

  const [allCards, setAllCards] = useState([])
  const [newAnswer, setNewAnswer] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [start, setStart] = useState('null')
  let [record, setRecord] = useState(null)
  const [inputColor, setInputColor] = useState('black')

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
    setStart('start')
    setInputColor('black')
    setNewAnswer('')
    const randQ = Math.floor(Math.random() * cards.length)
    setNewQuestion(cards[randQ])
  }

  const handleAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }

  const handleAnswerBtn = () => {
    //console.log(newAnswer)
    //setNewAnswer('')

    if(newAnswer === newQuestion.word) {
      console.log('RIGHT!')
      setInputColor('forestgreen')
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
      setInputColor('lightcoral')
      const newObject = {
        word: newQuestion.word,
        translate: newQuestion.translate,
        examples: newQuestion.examples,
        progress: newQuestion.progress - 1
      }
      cardService.update(newQuestion.id, newObject)
    }
    setStart('next')
    //changeQuestion()
  }

  const handleStartBtn = () => {
    changeQuestion()
  }

  const ButtonComponent = () => {
    if(start === 'null') {
      return <Button onClick={handleStartBtn}>Start</Button>
    } else if (start === 'start') {
      return <Button onClick={handleAnswerBtn}>Answer</Button>
    }
    else if (start === 'next') {
      return <Button onClick={changeQuestion}>Next</Button>
    }
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
        <br/>
        <Input onChange={handleAnswerChange} value={newAnswer} backgroundColor={inputColor}/>
        <br/>
        <br/>
        <ButtonComponent/>
      </div>
    )
  } else return (
    <div>Need at least 4 cards to play!</div>
  )
}

export default WritingGame