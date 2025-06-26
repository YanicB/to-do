import Todo from '../models/todo.js'
import { Router } from 'express'

const todoRouter = Router()

todoRouter.post('/', (req, res, next) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }
    const todo = new Todo({
        content: body.content,
        completion: body.completion || false,
    })
    todo.save().then(savedTodo => {
        res.json(savedTodo)
    })
        .catch(err => next(err))
})

todoRouter.get('/', (req, res) => {
    Todo.find({}).then(todos => {
        res.json(todos)
    })
})

todoRouter.get('/:id', (req, res, next) => {
    Todo.findById(req.params.id)
        .then(todo => {
            if (todo) {
                res.json(todo)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

todoRouter.put('/:id', (req, res, next) => {
    const { content, completion } = req.body
    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).end()
            }
            todo.content = content
            todo.completion = completion

            return todo.save().then((updatedTodo) => {
                res.json(updatedTodo)
            })
        })
        .catch(error => next(error))
})

todoRouter.delete('/:id', (req, res, next) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

export default todoRouter
