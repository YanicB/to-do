import Todo from '../models/todo.js'
import { Router } from 'express'

const todoRouter = Router()

todoRouter.post('/', async (req, res, next) => {
    const body = req.body

    const todo = new Todo({
        content: body.content,
        completion: body.completion || false,
    })

    try {
        const savedTodo = await todo.save()
        res.status(201).json(savedTodo)
    } catch (exception) {
        next(exception)
    }
})

todoRouter.get('/', async (req, res) => {
    const todos = await Todo.find({})
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
