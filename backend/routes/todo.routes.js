import { Router } from 'express';

const todoRouter = Router();

todoRouter.get('/', (req, res) => res.json(todo));

todoRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const todoItem = todo.find(t => t.id === id);

    if (!todoItem) {
        return res.status(404).json({ error: 'Todo not found.' });
    }
    res.json(todoItem);
});

todoRouter.post('/', (req, res) => {
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        completed: false
    }

    todo.push(newTodo);
    res.status(201).json({ message: 'Todo was succesfully added', todo: newTodo })
});

todoRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const todoItem = todo.find(t => t.id === id);

    if (!todoItem) return res.status(404).json({ error: 'Todo not found. ' });

    todoItem.task = req.body.task;
    todoItem.completed = req.body.completed ?? todoItem.completed;

    res.status(200).json({ message: 'Todo was successfully updated', todo: todoItem });
});

todoRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    todo = todo.filter(t => t.id !== id);

    res.status(204).end();
});

export default todoRouter;



