import Card from './Card.jsx'
import { useState, useEffect } from 'react'
import { getAll, postTodo, deleteTodo, setToken } from '../services/todo.jsx'
import loginService from '../services/login.jsx'
import InputForm from './InputForm.jsx'
import ConfirmModal from './ConfirmModal.jsx'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const initialTodos = await getAll()
                setTodos(initialTodos)
            } catch (err) {
                console.error(`Error fetching todos: ${err}`)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedTodoappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
        }
    }, [])

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="text"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedTodoappUser', JSON.stringify(user)
            )

            setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('wrong credentials')
        }
    }
    const addTodo = async (event) => {
        event.preventDefault()

        try {
            let response = await postTodo({
                content: newTodo,
                completion: false,
            })
            setTodos(todos.concat(response))
        } catch (err) {
            console.log(err.response.data.error)
        }
        setNewTodo('')
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteTodo(selectedTodo.id)
            setTodos(todos.filter(todo => todo.id !== selectedTodo.id))
        } catch (err) {
            console.error("Error deleting Todo", err)
        } finally {
            setOpenModal(false)
            setSelectedTodo(null)
        }
    }
    return (
        <div className="h-full w-full flex flex-col items-center justify-start p-6 space-y-6 ">
            <h1 className="text-4xl md:text-6xl font-bold text-center font-sans">Todo List App</h1>
            <div className="flex flex-col justify-center items-center space-y-5">
                {user === null ?
                    loginForm() :
                    <div>
                        <p>{user.name} logged-in</p>
                        <InputForm newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
                    </div>}

                <div>
                    <ul className="space-y-5">
                        {todos.map((card) => (
                            <li className="bg-gray-100 w-full sm:w-96 min-h-10 rounded-2xl p-4 text-lg hover:bg-gray-200" key={card.id} >
                                <Card todos={todos} setTodos={setTodos} todo={card} setSelectedTodo={setSelectedTodo} openModal={setOpenModal} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {openModal && <ConfirmModal openModal={setOpenModal} message={`Are you sure you want to to delete "${selectedTodo.content}"?`} onConfirm={handleConfirmDelete} />}
        </div>
    )
}

export default Todo
