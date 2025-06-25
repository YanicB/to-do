import axios from 'axios'
const baseUrl = 'api/v1/todo'

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export const postTodo = async (todoObject) => {
    const response = await axios.post(baseUrl, todoObject)
    return response.data
}

export const deleteTodo = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}


