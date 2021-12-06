import React, { useEffect, useState } from 'react'
import cardService from '../services/cards'

const Games = ({ blog }) => {

  if(!blog) {
    return null
  }

  const [allCards, setAllCards] = useState([])

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

  const StartQuizGame = () => {
    changeAnswers()
  }

  let arrayOfAnswers = []
  let question = ''
  let answer1 = ''
  let answer2 = ''
  let answer3 = ''
  let answer4 = ''
  let randQ = null

  const Quiz = () => {
    return (
      <div>
        <h2 id='question'>question</h2>
        <button id='answer1' onClick={FirstAnswerSelected}>answer 1</button>
        <button id='answer2' onClick={SecondAnswerSelected}>answer 2</button>
        <button id='answer3' onClick={ThirdAnswerSelected}>answer 3</button>
        <button id='answer4' onClick={FourthAnswerSelected}>answer 4</button>
      </div>
    )
  }

  const FirstAnswerSelected = () => {
    if(randQ === 0) {
      console.log('RIGHT!')
      changeAnswers()
    } else {
      console.log('WRONG!' + randQ)
    }
    changeAnswers()
  }

  const SecondAnswerSelected = () => {
    if(randQ === 1) {
      console.log('RIGHT!')
    } else {
      console.log('WRONG!' + randQ)
    }
    changeAnswers()
  }

  const ThirdAnswerSelected = () => {
    if(randQ === 2) {
      console.log('RIGHT!')
    } else {
      console.log('WRONG!' + randQ)
    }
    changeAnswers()
  }

  const FourthAnswerSelected = () => {
    if(randQ === 3) {
      console.log('RIGHT!')
    } else {
      console.log('WRONG!' + randQ)
    }
    changeAnswers()
  }

  const changeAnswers = () => {
    // Valita 4 satunnaisia korttia:
    let randA = null
    arrayOfAnswers = []
    while(arrayOfAnswers.length < 4){
      randA = Math.floor(Math.random() * cards.length)
      if(arrayOfAnswers.filter(a => a === cards[randA])) {
        arrayOfAnswers.push(cards[randA])
        console.log(cards[randA])
      }
    }

    randQ = Math.floor(Math.random() * arrayOfAnswers.length)
    const randQuestion = arrayOfAnswers[randQ]

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
  }

  return (
    <div>
      <h1>Games</h1>
      <div><button id='start' onClick={StartQuizGame}>start</button></div>
      <Quiz/>
    </div>
  )
}

export default Games