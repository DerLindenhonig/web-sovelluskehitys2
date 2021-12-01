import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import cardService from '../services/cards'

const Cards = ({ blog }) => {

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

  const cards = []
  for(let i = 0; i < allCards.length; i++) {
    if(blog.id === allCards[i].blog.id) {
      cards.push(allCards[i])
    }
  }

  return (
    <div>
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