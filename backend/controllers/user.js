import User from '../models/user.js'
import { Router } from 'express'
import bcrypt from 'bcrypt'

const usersRouter = Router()

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
