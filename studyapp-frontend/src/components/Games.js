import React from 'react'

const Games = ({ blog }) => {

  if(!blog) {
    return null
  }

  const StartQuizGame = () => {
    console.log('blog ' + blog)
    console.log(blog.cards)

    const random = Math.floor(Math.random() * blog.cards.length)

    console.log('cards length: ' + blog.cards.length)
    console.log('random card id: ' + random)
    console.log('random card: ' + blog.cards[random])

    QuizAnswerBtns()
  }

  let answer1 = ''
  let answer2 = ''
  let answer3 = ''
  let answer4 = ''

  const QuizAnswerBtns = () => {
    return (
      <div>
        <button id='answer1' onClick={quizGameAnswer} value='my value'>answer 1</button>
        <button id='answer2' onClick={quizGameAnswer} value='my value'>answer 2</button>
        <button id='answer3' onClick={quizGameAnswer} value='my value'>answer 3</button>
        <button id='answer4' onClick={quizGameAnswer} value='my value'>answer 4</button>
      </div>
    )
  }

  const quizGameAnswer = () => {
    // Valita 4 sattunaisia korttia:
    const arrayOfAnswers = []
    while(arrayOfAnswers.length < 4){
      const rand = Math.floor(Math.random() * blog.cards.length)
      if(arrayOfAnswers.filter(a => a === blog.cards[rand])) {
        arrayOfAnswers.push(blog.cards[rand])
        console.log(blog.cards[rand])
      }
    }

    answer1 = arrayOfAnswers[0]
    answer2 = arrayOfAnswers[1]
    answer3 = arrayOfAnswers[2]
    answer4 = arrayOfAnswers[3]

    let btn1 = document.getElementById('answer1')
    btn1.value = 'my value'
    btn1.innerHTML = answer1
    let btn2 = document.getElementById('answer2')
    btn2.value = 'my value'
    btn2.innerHTML = answer2
    let btn3 = document.getElementById('answer3')
    btn3.value = 'my value'
    btn3.innerHTML = answer3
    let btn4 = document.getElementById('answer4')
    btn4.value = 'my value'
    btn4.innerHTML = answer4

    QuizAnswerBtns()
  }

  return (
    <div>
      <h1>Games</h1>
      <div><button id='start' onClick={StartQuizGame}>start</button></div>
      <QuizAnswerBtns/>
    </div>
  )
}

export default Games