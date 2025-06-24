import CardList from './CardList.jsx'
import { useState, useEffect } from 'react'
import { getAll } from '../services/todo.jsx'
const Todo = () => {
    const [todos, setTodos] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const initalTodos = await getAll()
                setTodos(initalTodos)
            } catch (err) {
                console.error(`Error fetching todos: ${err}`)
            }
        }
        fetchData()
    }, [])

    const filteredTodo = todos.filter(todo =>
        todo.task.toLowerCase().includes(query.toLowerCase()))

    return (
        <div className="w-100 h-[85vh] bg-red-800 flex justify-center align-center rounded-3xl m-8">
            <div>
                <input
                    placeholder="Search todos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <CardList cards={filteredTodo} />
        </div>
    )
}

export default Todo
