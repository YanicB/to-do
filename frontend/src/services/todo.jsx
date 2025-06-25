import axios from 'axios'
const baseUrl = 'api/v1/todo'

export const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const postTodo = async (todoObject) => {
    try {
        const response = await axios.post(baseUrl, todoObject)
        return response.data
    } catch (err) {
        console.log(`Invalid Input: ${err}`)
    }
}

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


