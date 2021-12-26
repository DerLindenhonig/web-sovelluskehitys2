import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import cardService from '../services/cards'
import Notification from './Notification'
import {Link} from 'react-router-dom'
import userService from '../services/users'

const QuizGame = ({ blog, users, setUsers }) => {

  if(!blog) {
    console.log(blog)
    return null
  }

  const [allCards, setAllCards] = useState([])
  let [record, setRecord] = useState(0)
  let [guestionText, setQuestionText] = useState('')

  let [answer1Text, setAnswer1Text] = useState('answer 1')
  let [answer2Text, setAnswer2Text] = useState('answer 2')
  let [answer3Text, setAnswer3Text] = useState('answer 3')
  let [answer4Text, setAnswer4Text] = useState('answer 4')

  let [randQ1, setRandQ1] = useState(null)
  let [questionId, setQuestionId] = useState('')
  let [card, setCard] = useState(null)
  const [message, setMessage] = useState(null)
  const [start, setStart] = useState('null')
  let [round, setRound] = useState(0)

  let [answer1Variant, setAnswer1Variant] = useState('outline-dark')
  let [answer2Variant, setAnswer2Variant] = useState('outline-dark')
  let [answer3Variant, setAnswer3Variant] = useState('outline-dark')
  let [answer4Variant, setAnswer4Variant] = useState('outline-dark')

  //const [userLevel, setUserLevel] = useState(0)

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
      setAnswer1Variant('success')
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
    } else if (randQ1 !== 0 && card.progress > 0) {
      console.log('WRONG!')
      setAnswer1Variant('danger')
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    //changeAnswers()
    setStart('next')
  }

  const SecondAnswerSelected = () => {
    if(randQ1 === 1) {
      console.log('RIGHT!' + answer1Variant + answer2Variant + answer3Variant + answer4Variant)
      setAnswer2Variant('success')
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
      setAnswer2Variant('danger')
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    //changeAnswers()
    setStart('next')
  }

  const ThirdAnswerSelected = () => {
    if(randQ1 === 2) {
      console.log('RIGHT!')
      setAnswer3Variant('success')
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
      setAnswer3Variant('danger')
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    //changeAnswers()
    setStart('next')
  }

  const FourthAnswerSelected = () => {
    if(randQ1 === 3) {
      console.log('RIGHT!')
      setAnswer4Variant('success')
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
      setAnswer4Variant('danger')
      const newObject = {
        word: card.word,
        translate: card.translate,
        examples: card.examples,
        progress: card.progress - 1
      }
      cardService.update(questionId, newObject)
      wrongMessage()
    }
    //changeAnswers()
    setStart('next')
  }

  const changeAnswers = () => {
    setAnswer1Variant('outline-dark')
    setAnswer2Variant('outline-dark')
    setAnswer3Variant('outline-dark')
    setAnswer4Variant('outline-dark')

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
    randQ = Math.floor(Math.random() * arrayOfAnswers.length)
    const randQuestion = arrayOfAnswers[randQ]

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
    setRound(round + 1)
  }

  const handleStartBtn = () => {
    setStart('start')
    changeAnswers()
  }

  const ButtonComponent = () => {
    if(start === 'null') {
      return <Button onClick={handleStartBtn}>Start</Button>
    } else if (start === 'start') {
      return <Button onClick={changeAnswers}>Answer</Button>
    }
    else if (start === 'next') {
      return <Button onClick={changeAnswers}>Next</Button>
    }
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

  const RestartButton = () => {
    setRound(0)
    setStart('null')
    setRecord(0)
  }

  const SaveUserLevel = () => {
    let thisUser = null
    {users
      .filter(user => user.username === blog.author)
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

  if(round > 3 && record === 3) {
    return (
      <div>
        <br/>
        <h3>Excellent!</h3>
        <h5>Your score: {record} / 10</h5>
        <Buttons/>
      </div>
    )
  } else if (round > 3 && record >= 2) {
    return (
      <div>
        <br/>
        <h3>Well done!</h3>
        <h5>Your score: {record} / 10</h5>
      </div>
    )
  } else if (round > 3 && record < 2) {
    return (
      <div>
        <br/>
        <h3>Don`t worry, you can do it!</h3>
        <h5>Your score: {record} / 10</h5>
      </div>
    )
  }else if(blog.cards.length > 3 && round < 4) {
    return (
      <div>
        <br/>
        <h3>Translate-Word</h3>
        <br/>
        <Notification message={message}/>
        <div>right answers: {record}</div>
        <div>round: {round}</div>
        <br/>
        <h4 id='question'>{guestionText}</h4>
        <br/>
        <Button variant={answer1Variant} id='answer1' onClick={FirstAnswerSelected}>{answer1Text}</Button>{' '}
        <Button variant={answer2Variant} id='answer2' onClick={SecondAnswerSelected}>{answer2Text}</Button>{' '}
        <Button variant={answer3Variant} id='answer3' onClick={ThirdAnswerSelected}>{answer3Text}</Button>{' '}
        <Button variant={answer4Variant} id='answer4' onClick={FourthAnswerSelected}>{answer4Text}</Button>
        <br/>
        <br/>
        <ButtonComponent/>
        <br/>
      </div>
    )
  } else if (blog.cards.length < 3 && round < 4){
    return <div>Need at least 4 cards to play!</div>
  }
}

export default QuizGame