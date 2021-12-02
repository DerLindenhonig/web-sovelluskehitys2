import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import cardService from '../services/cards'
import NewCardForm from './NewCardForm'
import Card from './Card'

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
      <NewCardForm createCard={handleAddCard} blogId={blog.id}/>

      <h2>Cards</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <h3>word</h3>
            </td>
            <td>
              <h3>translate</h3>
            </td>
            <td>
              <h3>example</h3>
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