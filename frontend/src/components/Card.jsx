const Card = ({ task, completed }) => {
    return (
        <div className="">
            <h3>{task}</h3>
            <p>{completed}</p>
        </div>
    )
}

export default Card
