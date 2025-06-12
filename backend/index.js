import express from 'express';
import todoRouter from './routes/todo.routes.js';

const app = express();

app.use(express.json());
app.use('/api/v1/todo', todoRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the To-do list API');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
