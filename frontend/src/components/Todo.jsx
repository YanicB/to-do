import Card from './Card.jsx'
import { useState, useEffect } from 'react'
import { getAll, deleteTodo, postTodo } from '../services/todo.jsx'
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

    const removeTodo = async (id, content) => {
        if (window.confirm(`Delete ${content}?`)) {
            let response = await deleteTodo(id)
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
        }
    }

    const handleTodoChange = (event) => {
        setNewTodo(event.target.value)
    }


    const addTodo = async (event) => {
        event.preventDefault()
        let response = await postTodo({
            content: newTodo,
            completion: false,
        })
        setTodos(todos.concat(response))
        setNewTodo('')
    }
    const filteredTodo = todos.filter(todo =>
        todo.content.toLowerCase().includes(query.toLowerCase()))

    return (
        <div className="w-100 h-[85vh] bg-red-800 flex justify-center align-center rounded-3xl m-8">
            <div>
                <form onSubmit={addTodo}>
                    <div>
                        Todo
                        <input
                            value={newTodo}
                            onChange={handleTodoChange}
                        />
                    </div>
                    <button type="submit">add</button>
                </form>
                <input
                    placeholder="Search todos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div>
                <ul>
                    {filteredTodo.map((card) => (
                        <li key={card.id}>
                            <Card content={card.content} completion={card.completion} />
                            <button onClick={() => removeTodo(card.id, card.content)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Todo
