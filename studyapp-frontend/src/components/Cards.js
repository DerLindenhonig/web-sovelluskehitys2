import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import cardService from '../services/cards'
import NewWordForm from './NewWordForm'

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
        })
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
      <h2>Add new</h2>
      <NewWordForm createCard={handleAddCard} blogId={blog.id}/>

      <h2>Cards</h2>
      <Table striped>
        <tbody>
          {cards.map(card =>
            <tr key={card.id}>
              <td>
                {card.word}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Cards