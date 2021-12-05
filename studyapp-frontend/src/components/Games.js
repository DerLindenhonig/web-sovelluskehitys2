import React from 'react'

const Games = ({ blog }) => {

  const startQuizGame = () => {
    console.log(blog)
  }

  const quizGameAnswer = () => {

  }

  return (
    <div>
      <h1>Games</h1>
      <div><button id='start' onClick={startQuizGame}>start</button></div>
      <button id='answer' onClick={quizGameAnswer}>...</button>
      <button id='answer' onClick={quizGameAnswer}>...</button>
      <button id='answer' onClick={quizGameAnswer}>...</button>
      <button id='answer' onClick={quizGameAnswer}>...</button>
    </div>
  )
}

export default Games