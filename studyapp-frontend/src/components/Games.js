import React, { useEffect, useState } from 'react'
import cardService from '../services/cards'
import Togglable from './Togglable'

const Games = ({ blog }) => {

  if(!blog) {
    return null
  }

  const [allCards, setAllCards] = useState([])
  let [record, setRecord] = useState(null)
  let [guestionText, setQuestionText] = useState('question')
  let [answer1Text, setAnswer1Text] = useState('answer 1')
  let [answer2Text, setAnswer2Text] = useState('answer 2')
  let [answer3Text, setAnswer3Text] = useState('answer 3')
  let [answer4Text, setAnswer4Text] = useState('answer 4')
  let [randQ1, setRandQ1] = useState(null)

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
  //let record = null

  const Quiz = () => {
    console.log('randQ / Quiz ' + randQ1)
    return (
      <div>
        <div>right answers: {record}</div>
        <h2 id='question'>{guestionText}</h2>
        <button id='answer1' onClick={FirstAnswerSelected}>{answer1Text}</button>
        <button id='answer2' onClick={SecondAnswerSelected}>{answer2Text}</button>
        <button id='answer3' onClick={ThirdAnswerSelected}>{answer3Text}</button>
        <button id='answer4' onClick={FourthAnswerSelected}>{answer4Text}</button>
        <br/>
        <button id='next' onClick={changeAnswers}>next</button>
      </div>
    )
  }

  const FirstAnswerSelected = () => {
    if(randQ1 === 0) {
      console.log('RIGHT!')
      record++
      setRecord(record)
    } else {
      console.log('WRONG!' + randQ1)
    }
    changeAnswers()
  }

  const SecondAnswerSelected = () => {
    if(randQ1 === 1) {
      console.log('RIGHT!')
      record++
      setRecord(record)
    } else {
      console.log('WRONG!' + randQ1)
    }
    changeAnswers()
  }

  const ThirdAnswerSelected = () => {
    if(randQ1 === 2) {
      console.log('RIGHT!')
      record++
      setRecord(record)
    } else {
      console.log('WRONG!' + randQ1)
    }
    changeAnswers()
  }

  const FourthAnswerSelected = () => {
    if(randQ1 === 3) {
      console.log('RIGHT!')
      record++
      setRecord(record)
    } else {
      console.log('WRONG!' + randQ1)
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
        console.log('cards[randA] ' + cards[randA].id)
      }
    }
    console.log('arrayOfAnswers 0: ' + arrayOfAnswers[0].id + ' 1: ' + arrayOfAnswers[1].id + ' 2: ' + arrayOfAnswers[2].id + ' 3: ' + arrayOfAnswers[3].id )

    randQ = Math.floor(Math.random() * arrayOfAnswers.length)
    const randQuestion = arrayOfAnswers[randQ]

    console.log('randQ ' + randQ)

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
  }

  return (
    <div>
      <h1>Games</h1>
      <Togglable buttonLabel='start'>
        <Quiz/>
      </Togglable>
    </div>
  )
}

export default Games