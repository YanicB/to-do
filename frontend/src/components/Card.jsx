// TODO: move button inside of card
import { deleteTodo } from '../services/todo.jsx'
import { Trash } from 'lucide-react'
const Card = ({ todo, setTodos, todos }) => {

    const removeTodo = async (id, content) => {
        if (window.confirm(`Delete ${content}?`)) {
            let response = await deleteTodo(id)
            setTodos(todos.filter(x => x.id !== id))

        }
    }
    return (
        <div className="flex flex-row justify-between items-center ">
            <h3>{todo.content}</h3>
            <button
                onClick={() => removeTodo(todo.id, todo.content)}>
                <Trash />
            </button>
        </div>
    )
}
export default Card
