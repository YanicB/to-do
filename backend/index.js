import express from 'express';
//import todoRouter from './routes/todo.routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Todo from './models/todo.js'

dotenv.config()

const app = express();
app.use(express.json());
app.use(express.static('dist'));
//app.use('/api/v1/todo', todoRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the To-do list API');
});

app.post('/api/v1/todo', (req, res) => {
    const body = req.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const todo = new Todo({
        content: body.content,
        completion: body.completion || false,
    })

    todo.save().then(savedTodo => {
        res.json(savedTodo)
    })
})

app.get('/api/v1/todo', (req, res) => {
    Todo.find({}).then(todos => {
        res.json(todos)
    })

    app.get('api/v1/todo/:id', (req, res) => {
        Todo.findById(req.params.id).then(todo => {
            res.json(todo)
        })
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
