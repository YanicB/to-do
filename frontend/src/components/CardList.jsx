import Card from './Card.jsx'
import { deleteTodo } from '../services/todo.jsx'

const CardList = ({ cards }) => {

    const removeTodo = async (id, content) => {
        if (window.confirm(`Delete ${content}?`)) {
            response = await deleteTodo(id)
        }
    }

    return (
        <div>
            <ul>
                {cards.map((card) => (
                    <li key={card.id}>
                        <Card content={card.content} completion={card.completion} />
                        <button onClick={() => removeTodo(card.id, card.content)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CardList
