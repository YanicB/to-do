// TODO: move Button inside of card
import { deleteTodo } from '../services/todo.jsx'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
const Card = ({ todo, setTodos, todos }) => {

    const removeTodo = async (id, content) => {
        if (window.confirm(`Delete ${content}?`)) {
            let response = await deleteTodo(id)
            setTodos(todos.filter(x => x.id !== id))

        }
    }
    return (
        <div className="flex flex-row ">
            <h3>{todo.content}</h3>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => removeTodo(todo.id, todo.content)}>
            </Button>
        </div>
    )
}

export default Card
