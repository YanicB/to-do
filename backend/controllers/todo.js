import Todo from '../models/todo.js'
import { Router } from 'express'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const todoRouter = Router()

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

todoRouter.post('/', async (req, res, next) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return res.json(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return res.status(400).json({ error: 'userId missing or not valid' })
    }

    const todo = new Todo({
        content: body.content,
        completion: body.completion || false,
        user: user._id
    })

    try {
        const savedTodo = await todo.save()
        user.todos = user.todos.concat(savedTodo._id)
        await user.save()

        res.status(201).json(savedTodo)
    } catch (exception) {
        next(exception)
    }
})

todoRouter.get('/', async (req, res) => {
    const todos = await Todo.find({}).populate('user', { username: 1, name: 1 })
    res.json(todos)
})

todoRouter.get('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (todo) {
            res.json(todo)
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

todoRouter.put('/:id', async (req, res, next) => {
    const { content, completion } = req.body
    try {
        const todo = await Todo.fidndById(req.params.id)
        if (!todo) return res.status(404).end()
        todo.content = content
        todo.completion = completion

        const updatedTodo = await todo.save()
        return res.json(updatedTodo)
    } catch (exception) {
        next(exception)
    }
})

todoRouter.delete('/:id', async (req, res, next) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

export default todoRouter
