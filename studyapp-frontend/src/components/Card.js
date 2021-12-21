import React from 'react'
import cardService from '../services/cards'
import styled from 'styled-components'

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

  const Button = styled.button`
  background: lightcoral;
  font-size: 1em;
  padding: 0.15em 0.5em;
  border: 1px solid Black;
  border-radius: 3px;
  display: inline;
`

  if (blog.user.username === user.username) {
    return <Button variant="danger" id='deleteCard' size="sm" onClick={deleteCard}>delete</Button>
  } else return null
}
export default Card