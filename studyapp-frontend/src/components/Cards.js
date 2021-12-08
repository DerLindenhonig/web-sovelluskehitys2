import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import cardService from '../services/cards'
import NewCardForm from './NewCardForm'
import Card from './Card'
//import Togglable from './Togglable'
//import EditCardForm from './EditCardForm'
import EditCard from './EditCard'

const Cards = ({ blog, user }) => {

  const [allCards, setAllCards] = useState([])

  if (!blog) {
    return (
      <div>blog not exist</div>
    )
  }

  useEffect(() => {
    cardService.getAll()
      .then(cards =>
        setAllCards(cards)
      )
  }, [])

  const  CreateCardBtn = () => {
    if (blog.user.username === user.username) {
      return (
        <NewCardForm createCard={handleAddCard} blogId={blog.id}/>
      )
    } else {
      return null
    }
  }

  /*const EditCardBtn = (card) => {
    console.log('card id: ' + card.id)
    if (blog.user.username === user.username) {
      return (
        <Togglable buttonLabel='edit'>
          <EditCardForm editCard={handleEditCard} card={card}/>
        </Togglable>
      )
    } else {
      return null
    }
  }

  const handleEditCard = (card, cardObject) => {
    cardService
      .update(card.id, cardObject)
      .then(returnedCard => {
        setAllCards(allCards.concat(returnedCard))
        cards.push(returnedCard)
      })
    cardService.getAll()
      .then(cards =>
        setAllCards(cards)
      )
  }*/

  const handleAddCard = (cardObject) => {
    cardService.setToken(user.token)
    try {
      cardService
        .create(cardObject)
        .then(returnedCard => {
          setAllCards(allCards.concat(returnedCard))
          cards.push(returnedCard)
        })
      cardService.getAll()
        .then(cards =>
          setAllCards(cards)
        )
    } catch (error) { return error }
  }

  const cards = []
  for(let i = 0; i < allCards.length; i++) {
    if(blog.id === allCards[i].blog.id) {
      cards.push(allCards[i])
    }
  }

  return (
    <div>
      <br/>
      <CreateCardBtn/>
      <br/>
      <h3>Cards</h3>
      <br/>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <h4>word</h4>
            </td>
            <td>
              <h4>translate</h4>
            </td>
            <td>
              <h4>example</h4>
            </td>
            <td>
              <h4>progress</h4>
            </td>
            <td>
              <h4></h4>
            </td>
            <td>
              <h4></h4>
            </td>
          </tr>
          {cards.map(card =>
            <tr key={card.id}>
              <td>
                {card.word}
              </td>
              <td>
                {card.translate}
              </td>
              <td>
                {card.examples}
              </td>
              <td>
                {card.progress} %
              </td>
              <td>
                <EditCard card={card} user={user} setAllCards={setAllCards} allCards={allCards} blog={blog} cards={cards}/>
              </td>
              <td>
                <Card card={card} user={user} blog={blog} setAllCards={setAllCards}/>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Cards