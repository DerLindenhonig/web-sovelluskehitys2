const cardsRouter = require('express').Router()
const Card = require('../models/card')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

cardsRouter.get('/', async (request, response) => {
  const cards = await Card.find({}).populate('blog')
  response.json(cards)
})

cardsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({error: 'invalid token'})
    }

    if (!body.word) {
      return response.status(400).end()
    }

    //const blogId = request.params.id
    const blog = await Blog.findById(body.blogId)
    if (blog === null) {
      return response
        .status(404)
        .send(`blog with id ${blogId} is not exist`)
    }

    const card = new Card({
      word: body.word,
      translate: body.translate,
      examples: body.examples,
      blog: blog._id
    })

    const savedCard = await card.save()
    blog.cards = blog.cards.concat(savedCard._id)
    await blog.save()
    response.status(201).json(savedCard)

  } catch(error) {next(error)}
})

cardsRouter.delete('/:id', async (request, response) => {
  const card = await Card.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }

  if (card.user.toString() !== decodedToken.id.toString()) {
    response.status(401).end()
  } else if (card.user.toString() === decodedToken.id.toString()) {
    await card.remove()
    response.status(204).end()
  }
})

cardsRouter.put('/', async (request, response, next) => {
  const body = request.body

  const editedCard = {
    title: body.title,
    author: body.author,
    url: body.url
  }

  try {
    const card = await Card.findByIdAndUpdate(request.params.id, editedCard, {new: true})
    response.json(card)

  } catch (error) { next(error) }
})

module.exports = cardsRouter