import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import cardService from '../services/cards'
import NewCardForm from './NewCardForm'
import Card from './Card'
import EditCard from './EditCard'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import styled from 'styled-components'

const Button = styled.button`
  background: lightcoral;
  font-size: 1em;
  padding: 0.15em 0.5em;
  border: 1px solid Black;
  border-radius: 3px;
  display: inline;
`

const Cards = ({ blog, user, setRefreshedBlogs }) => {

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

  const CreateCardBtn = () => {
    if (blog.user.name === user.name) {
      return (
        <Togglable buttonLabel='Add a new card'>
          <NewCardForm createCard={handleAddCard} blogId={blog.id}/>
        </Togglable>
      )
    } else {
      return null
    }
  }

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

  const DeleteBlogBtn = () => {
    if (blog.user.name === user.name) {
      return <Button size="sm" variant="danger" id='delete' onClick={deleteBlog}>delete wordlist</Button>
    } else {
      return null
    }
  }

  const deleteBlog = async event => {
    event.preventDefault()

    const confirm = window.confirm(`Are you sure you want to delete "${blog.title}"?`)
    if (confirm) {
      if(cards !== null) {
        cardService.setToken(user.token)
        for(let i = 0; i < cards.length; i++) {
          await cardService.remove(cards[i].id, user.token)
        }
        const allCards = await cardService.getAll()
        setAllCards(allCards)
      }

      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      const allBlogs = await blogService.getAll()
      setRefreshedBlogs(allBlogs)
    }
  }

  const AddToMyListBtn = () => {
    if (blog.user.name !== user.name) {
      return (
        <button onClick={AddToMyList}>add to my collection</button>
      )
    } else {
      return null
    }
  }

  const AddToMyList = async event => {
    event.preventDefault()

    const newBlog = {
      likes: 0,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      cards: blog.cards,
      user: user,
      status: 'private',
      category: blog.category,
      category2: blog.category2
    }
    await blogService.create(newBlog)
    const allBlogs = await blogService.getAll()
    setRefreshedBlogs(allBlogs)

    const allBlogsNumber = allBlogs.length-1
    const lastBlogId = allBlogs[allBlogsNumber].id

    for(let i = 0; i < cards.length; i++) {
      const newCard = {
        word: cards[i].word,
        translate: cards[i].translate,
        examples: cards[i].examples,
        blogId: lastBlogId
      }
      await cardService.create(newCard)
    }
  }

  const Progress = ({ card }) => {
    if (blog.user.name === user.name) {
      return (
        <td>
          {card.progress} %
        </td>
      )
    } else return null
  }

  const ProgressTitle = () => {
    if (blog.user.name === user.name) {
      return (
        <td>
          <h5>progress</h5>
        </td>
      )
    } else return null
  }

  return (
    <div>
      <DeleteBlogBtn/>
      <br/>
      <AddToMyListBtn/>
      <br/>
      <CreateCardBtn/>
      <br/>
      <h3>Cards</h3>
      <br/>
      <Table striped responsive ="sm" hover size="sm">
        <tbody>
          <tr>
            <td><h5>word</h5></td>
            <td><h5>translate</h5></td>
            <td><h5>example</h5></td>
            <ProgressTitle/>
            <td><h5></h5></td>
            <td><h5></h5></td>
          </tr>
          {cards.map(card =>
            <tr key={card.id}>
              <td>{card.word}</td>
              <td>{card.translate}</td>
              <td>{card.examples}</td>
              <Progress card={card}/>
              <td><EditCard card={card} user={user} setAllCards={setAllCards} allCards={allCards} blog={blog} cards={cards}/></td>
              <td><Card card={card} user={user} blog={blog} setAllCards={setAllCards}/></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Cards