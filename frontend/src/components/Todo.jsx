import Card from './Card.jsx'
import { useState, useEffect } from 'react'
import { getAll, postTodo } from '../services/todo.jsx'
import { Plus, Search } from 'lucide-react'
const Todo = () => {
    const [todos, setTodos] = useState([])
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-6 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center font-sans">Todo List App</h1>
            <div className="flex flex-col justify-center items-center space-y-5">
                <form className="flex flex-row min-w-sm justify-between" onSubmit={addTodo}>
                    <input
                        className="bg-gray-100 w-full sm:w-96 rounded-2xl px-4 py-3 text-lg"
                        type="text"
                        value={newTodo}
                        onChange={handleTodoChange}
                        placeholder="Enter a task..."
                    />
                    <button type="submit"
                        className="ml-2 px-4 py-2 text-xl bg-gray-300 rounded-full hover:bg-gray-400">
                        <Plus />
                    </button>
                </form>
                <div>
                    <ul className="space-y-5">
                        {todos.map((card) => (
                            <li className="bg-gray-100 w-full sm:w-96 min-h-10 rounded-2xl p-4 text-lg hover:bg-gray-200" key={card.id} >
                                <Card todo={card} setTodos={setTodos} todos={todos} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todo
