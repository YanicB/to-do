import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import Todo from './models/todo.js'

const app = express()

app.use(express.json())
app.use(express.static('dist'))

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the To-do list API')
})

app.post('/api/v1/todo/:id', (req, res, next) => {
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

app.get('/api/v1/todo', (req, res) => {
    Todo.find({}).then(todos => {
        res.json(todos)
    })
})

app.get('/api/v1/todo/:id', (req, res, next) => {
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

app.put('/api/v1/todo/:id', (req, res, next) => {
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

app.delete('/api/v1/todo/:id', (req, res, next) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

// ERROR HANDLER
const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message })
    }
    next(err)
}

app.use(errorHandler)

// START SERVER
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
