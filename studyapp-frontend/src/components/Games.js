import React from 'react'

const Games = ({ blogs }) => {

  const startQuizGame = () => {

    const blogId = () => {
      blogs.find(blog => blog.id === '61922316b432f095fc45bfb3')
    }

    console.log(blogId)
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