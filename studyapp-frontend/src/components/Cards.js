import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import cardService from '../services/cards'
import NewCardForm from './NewCardForm'
import Card from './Card'
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

  const DeleteBlogBtn = () => {
    if (blog.user.username === user.username) {
      return <button id='delete' onClick={deleteBlog}>delete blog</button>
    } else {
      return null
    }
  }

  const deleteBlog = async event => {
    event.preventDefault()

    const confirm = window.confirm(`Are you sure you want to delete "${blog.title}"?`)
    if (confirm) {
      cardService.setToken(user.token)
      console.log(blog.cards[0])
      for(let i = 0; i < blog.cards.length; i++) {
        console.log(blog.cards[i])
        await cardService.remove(blog.cards[i], user.token)
        const allCards = await cardService.getAll()
        setAllCards(allCards)
      }

      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      const allBlogs = await blogService.getAll()
      setRefreshedBlogs(allBlogs)
    }
  }

  const  CreateCardBtn = () => {
    if (blog.user.username === user.username) {
      return (
        <NewCardForm createCard={handleAddCard} blogId={blog.id}/>
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

  return (
    <div>
      <DeleteBlogBtn/>
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