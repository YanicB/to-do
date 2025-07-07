import User from '../models/user.js'
import { Router } from 'express'
import bcrypt from 'bcrypt'

const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('todos', { content: 1, completion: 1 })
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

export default usersRouter
