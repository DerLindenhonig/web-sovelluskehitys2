const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, id: 1, level: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({error: 'invalid token'})
        }

        if (!body.title) {
            return response.status(400).end()
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            cards: body.cards,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            status: body.status || 'public',
            category: body.category || 'other',
            category2: body.category2 || 'other',
            user: user._id,
            originalBlog: body.originalBlog || null
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)

    } catch(error) {next(error)}
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'invalid token'})
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
        response.status(401).end()
    } else if (blog.user.toString() === decodedToken.id.toString()) {
        await blog.remove()
        response.status(204).end()
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const editedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        status: body.status,
        category: body.category,
        category2: body.category2,
    }

    try {
        const blog = await Blog.findByIdAndUpdate(request.params.id, editedBlog, {new: true})
        response.json(blog)

    } catch (error) { next(error) }
})

blogsRouter.put('/add/:id', async (request, response, next) => {
    const body = request.body

    const editedBlog = {
        addedUsers: body.addedUsers,
    }

    try {
        const blog = await Blog.findByIdAndUpdate(request.params.id, editedBlog, {new: true})
        response.json(blog)

    } catch (error) { next(error) }
})

module.exports = blogsRouter