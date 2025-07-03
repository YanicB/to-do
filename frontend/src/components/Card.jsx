// TODO: move button inside of card
import { deleteTodo } from '../services/todo.jsx'
const Card = ({ todo, setTodos, todos }) => {

    const removeTodo = async (id, content) => {
        if (window.confirm(`Delete ${content}?`)) {
            let response = await deleteTodo(id)
            setTodos(todos.filter(x => x.id !== id))

        }
    }
    return (
        <div className="">
            <h3>{todo.content}</h3>
            <p>{todo.completion}</p>
            <button onClick={() => removeTodo(todo.id, todo.content)}>Delete</button>
        </div>
    )
}

export default Card
