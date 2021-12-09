import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import cardService from '../services/cards'
import NewCardForm from './NewCardForm'
import Card from './Card'
//import Togglable from './Togglable'
//import EditCardForm from './EditCardForm'
import EditCard from './EditCard'
import blogService from '../services/blogs'

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
    console.log('blog.id ' + blog.id)
    console.log(allCards[i].blog.id)
    console.log('here is something ' + allCards[i].id)
    if(allCards[i].blog.id === undefined) {
      console.log('here is something ' + allCards[i].id)
    }
    if(blog.id === allCards[i].blog.id) {
      cards.push(allCards[i])
    }
  }

  const AddToMyListBtn = () => {
    if (blog.user.username !== user.username) {
      return (
        <button onClick={AddToMyList}>add to my collection</button>
      )
    } else {
      return null
    }
  }

  const AddToMyList = async event => {
    event.preventDefault()

    console.log('blog.cards: ' + blog.cards)

    const newBlog = {
      likes: 0,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      cards: blog.cards,
      user: user,
    }
    await blogService.create(newBlog)
    const allBlogs = await blogService.getAll()
    setRefreshedBlogs(allBlogs)

    console.log('allBlogs: ' + allBlogs.length)
    const allBlogsNumber = allBlogs.length-1
    console.log('last blog: ' + allBlogs[allBlogsNumber].id)
    const lastBlogId = allBlogs[allBlogsNumber].id

    //cardService.setToken(user.token)
    for(let i = 0; i < cards.length; i++) {
      console.log('blog.card: ' + cards[i].word)
      const newCard = {
        word: cards[i].word,
        translate: cards[i].translate,
        examples: cards[i].examples,
        blogId: lastBlogId
      }

      await cardService.create(newCard)
      console.log('kortti on lisätty: ' + newCard)
    }
  }

  /*const CopyCards = async event => {
    event.preventDefault()
    for (let i = 0; i < blog.cards.length; i++) {
      console.log('blog.card: ' + blog.cards[i].word)
      const newCard = {
        word: blog.cards[i].word,
        translate: blog.cards[i].translate,
        examples: blog.cards[i].examples,
      }
      await cardService.create(newCard)
      setCopyCards(false)
    }
  }

  if (copyCards === true) {
    try {
      CopyCards().then(returnedCard => {
        setAllCards(allCards.concat(returnedCard))
      })
    } catch (error) { return error }
    /*const CopyCards = async () => {
      for (let i = 0; i < blog.cards.length; i++) {
        console.log('blog.card: ' + blog.cards[i].word)
        const newCard = {
          word: blog.cards[i].word,
          translate: blog.cards[i].translate,
          examples: blog.cards[i].examples,
        }
        await cardService.create(newCard)
      }
    }*/
  //}*/

  return (
    <div>
      <AddToMyListBtn/>
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