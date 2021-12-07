import React from 'react'
import cardService from '../services/cards'
import Togglable from './Togglable'
import EditCardForm from './EditCardForm'

const EditCard = ({ user, card, blog, setAllCards, cards, allCards }) => {

  const EditCardBtn = ({ card }) => {
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

  const handleEditCard = ( card, cardObject ) => {
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
  }


  return (
    <div>
      <EditCardBtn card={card}/>
    </div>
  )
}

export default EditCard