import Card from './Card.jsx'
import { useState, useEffect } from 'react'
import { getAll, postTodo } from '../services/todo.jsx'
const Todo = () => {
    const [todos, setTodos] = useState([])
    const [query, setQuery] = useState('')
    const [newTodo, setNewTodo] = useState('')

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
    const handleTodoChange = (event) => {
        setNewTodo(event.target.value)
    }
    const addTodo = async (event) => {
        event.preventDefault()
        try {
            let response = await postTodo({
                content: newTodo,
                completion: false,
            })
            setTodos(todos.concat(response))
        } catch (err) {
            console.log(err.response.data.error)
        }
        setNewTodo('')
    }

    const filteredTodo = todos.filter(todo =>
        todo.content.toLowerCase().includes(query.toLowerCase()))

    return (
        <div className="w-30 h-30 bg-red-150">
            <div>
                <input
                    placeholder="Search todos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <form className="flex flex-row" onSubmit={addTodo}>
                    <input
                        value={newTodo}
                        onChange={handleTodoChange}
                    />
                    <button type="submit">add</button>
                </form>
            </div>
            <div>
                <ul>
                    {filteredTodo.map((card) => (
                        <li key={card.id}>
                            <Card todo={card} setTodos={setTodos} todos={todos} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Todo
