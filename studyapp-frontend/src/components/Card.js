import React from 'react'
import cardService from '../services/cards'
//import blogService from "../services/blogs";

const Card = ({ user, card, blog, setAllCards }) => {

  const deleteCard = async (event) => {
    event.preventDefault()

    if (window.confirm(`Are you sure you want to delete "${card.title}"?`)) {
      cardService.setToken(user.token)
      await cardService.remove(card.id, user.token)
      const allCards = await cardService.getAll()
      setAllCards(allCards)
    }
  }

  if (blog.user.username === user.username) {
    return <button id='deleteCard' onClick={deleteCard}>delete</button>
  } else {
    return null
  }
}
export default Card