const Card = ({ content, completion }) => {
    return (
        <div className="">
            <h3>{content}</h3>
            <p>{completion}</p>
        </div>
    )
}

export default Card
