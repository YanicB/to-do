import { Plus } from 'lucide-react'

const InputForm = ({ newTodo, setNewTodo, addTodo }) => {

    const handleTodoChange = (event) => {
        setNewTodo(event.target.value)
    }
    return (
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
    )
}

export default InputForm
