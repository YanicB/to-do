import Card from './Card.jsx'

const CardList = ({ cards }) => {
    return (
        <div>
            <ul>
                {cards.map((card) => (
                    <li key={card.id}>
                        <Card task={card.task} completed={card.completed} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CardList
