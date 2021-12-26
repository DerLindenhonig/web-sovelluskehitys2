const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response, next) => {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, id: 1, status: 1, user: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.password) {
            return response
                .status(400)
                .json({ error: 'password is missing' })
        } else if (body.password.length < 3) {
            return response
              .status(400)
              .json({ error: 'password is too short' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            level: 0
        })

        const savedUser = await user.save()

        response.json(savedUser)

    } catch (error) {next(error)}
})

usersRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    /*const blog = await Blog.findById(body.blogId)
    if (blog === null) {
        return response
          .status(404)
          .send(`blog with id ${blogId} is not exist`)
    }*/

    const editedUser = {
        username: body.username,
        name: body.name,
        avatar: body.avatar,
        level: body.level
    }

    try {
        const user = await User.findByIdAndUpdate(request.params.id, editedUser, {new: true})
        response.json(user)

    } catch (error) { next(error) }
})

module.exports = usersRouter