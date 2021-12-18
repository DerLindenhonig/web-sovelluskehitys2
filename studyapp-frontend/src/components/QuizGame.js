import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import cardService from '../services/cards'
import Notification from './Notification'

const QuizGame = ({ blog }) => {

  if(!blog) {
    console.log(blog)
    return null
  }

  const [allCards, setAllCards] = useState([])
  let [record, setRecord] = useState(null)
  let [guestionText, setQuestionText] = useState('')
  let [answer1Text, setAnswer1Text] = useState('answer 1')
  let [answer2Text, setAnswer2Text] = useState('answer 2')
  let [answer3Text, setAnswer3Text] = useState('answer 3')
  let [answer4Text, setAnswer4Text] = useState('answer 4')
  let [randQ1, setRandQ1] = useState(null)
  let [questionId, setQuestionId] = useState('')
  let [card, setCard] = useState(null)
  const [message, setMessage] = useState(null)
  const [start, setStart] = useState(false)

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

  let arrayOfAnswers = []
  let question = ''
  let answer1 = ''
  let answer2 = ''
  let answer3 = ''
  let answer4 = ''
  let randQ = null

  const correctMessage = () => {
    setMessage({
      content: 'Correct!',
      type: 'successMessage'
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const wrongMessage = () => {
    setMessage({
      content: 'Wrong!',
      type: 'errorMessage'
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const FirstAnswerSelected = () => {
    if(randQ1 === 0) {
      console.log('RIGHT!')
      record++
      setRecord(record)
      console.log('card ' + card)

      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress + 1
      }
      cardService.update(questionId, newObject)
      correctMessage()
    } else if (randQ1 !== 0 && card.progress > 0) {
      console.log('WRONG!')
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    changeAnswers()
  }

  const SecondAnswerSelected = () => {
    if(randQ1 === 1) {
      console.log('RIGHT!')
      record++
      setRecord(record)

      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress + 1
      }
      cardService.update(questionId, newObject)
      correctMessage()
    } else if (randQ1 !== 1 && card.progress > 0) {
      console.log('WRONG!' + randQ1)
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    changeAnswers()
  }

  const ThirdAnswerSelected = () => {
    if(randQ1 === 2) {
      console.log('RIGHT!')
      record++
      setRecord(record)

      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress + 1
      }
      cardService.update(questionId, newObject)
      correctMessage()
    } else if (randQ1 !== 2 && card.progress > 0) {
      console.log('WRONG!' + randQ1)
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    changeAnswers()
  }

  const FourthAnswerSelected = () => {
    if(randQ1 === 3) {
      console.log('RIGHT!')
      record++
      setRecord(record)

      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress + 1
      }
      cardService.update(questionId, newObject)
      correctMessage()
    } else if (randQ1 !== 3 && card.progress > 0) {
      console.log('WRONG!' + randQ1)
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    changeAnswers()
  }

  const changeAnswers = () => {
    // Valita 4 satunnaisia korttia:
    let randA = null
    arrayOfAnswers = []
    while(arrayOfAnswers.length < 4){
      randA = Math.floor(Math.random() * cards.length)
      if(!arrayOfAnswers.includes(cards[randA])) {
        arrayOfAnswers.push(cards[randA])
        //console.log('cards[randA] ' + cards[randA].id)
      }
    }
    //console.log('arrayOfAnswers 0: ' + arrayOfAnswers[0].id + ' 1: ' + arrayOfAnswers[1].id + ' 2: ' + arrayOfAnswers[2].id + ' 3: ' + arrayOfAnswers[3].id )

    randQ = Math.floor(Math.random() * arrayOfAnswers.length)
    const randQuestion = arrayOfAnswers[randQ]

    //console.log('randQ ' + randQ)

    setCard(arrayOfAnswers[randQ])
    setRandQ1(randQ)

    question = randQuestion.word
    answer1 = arrayOfAnswers[0].translate
    answer2 = arrayOfAnswers[1].translate
    answer3 = arrayOfAnswers[2].translate
    answer4 = arrayOfAnswers[3].translate

    let btn1 = document.getElementById('answer1')
    btn1.innerHTML = answer1
    let btn2 = document.getElementById('answer2')
    btn2.innerHTML = answer2
    let btn3 = document.getElementById('answer3')
    btn3.innerHTML = answer3
    let btn4 = document.getElementById('answer4')
    btn4.innerHTML = answer4
    let quest = document.getElementById('question')
    quest.innerHTML = question

    setQuestionText(question)
    setAnswer1Text(answer1)
    setAnswer2Text(answer2)
    setAnswer3Text(answer3)
    setAnswer4Text(answer4)

    setQuestionId(randQuestion.id)
  }

  const handleStartBtn = () => {
    setStart(true)
    changeAnswers()
  }

  const ButtonComponent = () => {
    if(start === false) {
      return (
        <Button onClick={handleStartBtn}>Start</Button>
      )
    } else return (
      <Button onClick={changeAnswers}>Answer</Button>
    )
  }

  if(blog.cards.length > 3) {
    return (
      <div>
        <br/>
        <h3>Translate-Word</h3>
        <br/>
        <div>right answers: {record}</div>
        <br/>
        <h4 id='question'>{guestionText}</h4>
        <br/>
        <Button variant="outline-dark" id='answer1' onClick={FirstAnswerSelected}>{answer1Text}</Button>{' '}
        <Button variant="outline-dark" id='answer2' onClick={SecondAnswerSelected}>{answer2Text}</Button>{' '}
        <Button variant="outline-dark" id='answer3' onClick={ThirdAnswerSelected}>{answer3Text}</Button>{' '}
        <Button variant="outline-dark" id='answer4' onClick={FourthAnswerSelected}>{answer4Text}</Button>
        <br/>
        <br/>
        <ButtonComponent/>
        <br/>
        <Notification message={message}/>
        <br/>
      </div>
    )
  } else {
    return (
      <div>Need at least 4 cards to play!</div>
    )
  }

}

export default QuizGame