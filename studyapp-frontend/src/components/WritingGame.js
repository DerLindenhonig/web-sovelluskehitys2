import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import cardService from '../services/cards'
import styled from 'styled-components'
import userService from '../services/users'
import { Link } from 'react-router-dom'

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

const WritingGame = ({ blog, users, setUsers }) => {

  if(!blog) {
    return null
  }

  const [allCards, setAllCards] = useState([])
  const [newAnswer, setNewAnswer] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [start, setStart] = useState('null')
  let [record, setRecord] = useState(null)
  const [inputColor, setInputColor] = useState('black')
  let [round, setRound] = useState(0)

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
    setRound(round + 1)
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

  let userLevel = 0
  const OkButton = () => {
    setOk(true)
    userLevel = record
    console.log('userLevel 1 ' + userLevel)
    SaveUserLevel(userLevel)

    return(
      <div>
        <button onClick={RestartButton}>Restart</button>
        <Link to={`/blogs/${blog.id}`}>Back to {blog.title}</Link>
      </div>
    )
  }

  const SaveUserLevel = () => {
    let thisUser = null
    {users
      .filter(user => user.username === blog.user.username)
      .map(user =>
        thisUser = user
      )}

    console.log('thisUser 2 ' + thisUser.id)

    const userObject = ({
      username: thisUser.username,
      name: thisUser.name,
      avatar: thisUser.avatar,
      level: thisUser.level + userLevel
    })

    userService
      .update(thisUser.id, userObject)
      .then(returnedUser => {
        setUsers(users.concat(returnedUser))
      })
  }

  const [ok, setOk] = useState(false)

  const Buttons = () => {
    if(ok === false) {
      return <button onClick={OkButton}>Ok</button>
    } else if (ok === true) {
      return(
        <div>
          <br/>
          <button onClick={RestartButton}>Restart</button>
          <br/>
          <br/>
          <Link to={`/blogs/${blog.id}`}>Back to {blog.title}</Link>
        </div>
      )
    }
  }

  const RestartButton = () => {
    setRound(0)
    setStart('null')
    setRecord(0)
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

  if(round > 5 && record === 5) {
    return (
      <div>
        <br/>
        <h3>Excellent!</h3>
        <h5>Your score: {record} / 5</h5>
        <Buttons/>
      </div>
    )
  } else if (round > 5 && record >= 3) {
    return (
      <div>
        <br/>
        <h3>Well done!</h3>
        <h5>Your score: {record} / 5</h5>
      </div>
    )
  } else if (round > 5 && record < 3) {
    return (
      <div>
        <br/>
        <h3>Don`t worry, you can do it!</h3>
        <h5>Your score: {record} / 5</h5>
      </div>
    )
  } else if(blog.cards.length > 3 && round < 6) {
    return (
      <div>
        <br/>
        <h3>Writing</h3>
        <br/>
        <br/>
        <div>Right answers: {record}</div>
        <div>Questions: {round} / 5</div>
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