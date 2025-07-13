import axios from 'axios'
const baseUrl = 'api/v1/todo'

let token = null

export const setToken = newToken => {
    token = `Bearer ${newToken}`
}

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export const postTodo = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export const deleteTodo = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}


