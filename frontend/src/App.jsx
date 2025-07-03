import { useState } from 'react'
import Todo from './components/Todo.jsx'
function App() {
    return (
        <div className="flex flex-col justify-center items-center m-15 max-w-full max-h-full">
            <Todo />
        </div>
    )
}
export default App
