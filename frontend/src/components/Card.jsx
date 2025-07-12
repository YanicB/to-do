// TODO: move button inside of card
import { Trash, Check } from 'lucide-react'

const Card = ({ todo, todos, setTodos, setSelectedTodo, openModal }) => {
    const toggleComplete = () => {
        setTodos(
            todos.map(t =>
                t.id === todo.id ? { ...t, completion: !t.completion } : t
            )
        )
    }

    const handleDeleteClick = () => {
        setSelectedTodo(todo)
        openModal(true)
    }

    return (
        <div
            className={`flex justify-between items-center p-4 rounded-2xl
        ${todo.completion ? 'line-through text-gray-500' : 'bg-gray-100 hover:bg-gray-200'}
      `}
        >
            <span>{todo.content}</span>

            <div className="flex space-x-2">
                <button
                    onClick={toggleComplete}
                    aria-label="Toggle complete"
                    className="p-1 rounded-full hover:bg-green-100"
                >
                    <Check size={20} className={todo.completion ? 'text-green-600' : 'text-gray-400'} />
                </button>

                <button onClick={handleDeleteClick} aria-label="Delete">
                    <Trash size={20} className="text-gray-600 hover:text-red-600" />
                </button>
            </div>
        </div>
    )
}

export default Card
