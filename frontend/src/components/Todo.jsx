import Card from './Card'
import SearchBar from './SearchBar'
const Todo = () => {
    return (
        <div className="w-100 h-[85vh] bg-red-800 flex justify-center align-center rounded-3xl m-8">
            <SearchBar />
            <Card />
        </div>
    )
}

export default Todo
