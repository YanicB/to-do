import express from 'express';
import todoRouter from './routes/todo.routes.js';
import mongoose from 'mongoose';

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://todouser:${password}@cluster0.9rfxcrd.mongodb.net/something?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
const todoSchema = new mongoose.Schema({
    content: String,
    completion: Boolean,
})

const Todo = mongoose.model('Todo', todoSchema)

if (process.argv.length == 5) {
    const todo = new Todo({
        content: process.argv[3],
        completion: process.argv[4].toLowerCase() === 'true',
    })
    todo.save().then(result => {
        console.log(`added ${result.content}, with completion ${result.completion}`)
        mongoose.connection.close()
    })
}

const app = express();
app.use(express.json());
app.use(express.static('dist'));
//app.use('/api/v1/todo', todoRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the To-do list API');
});

app.get('/api/v1/todo', (req, res) => {
    Todo.find({}).then(todos => {
        res.json(todos)
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
