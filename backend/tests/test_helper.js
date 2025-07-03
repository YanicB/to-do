import Todo from '../models/todo.js'

const initialTodos = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true
    }
]

const nonExistingId = async () => {
    const todo = new Todo({ content: 'willremovethissoon' })
    await todo.save()
    await todo.deleteOne()

    return todo._id.toString()
}

const todosInDb = async () => {
    const todos = await Todo.find({})
    return todos.map(todo => todo.toJSON())
}

export default { initialTodos, nonExistingId, todosInDb }
