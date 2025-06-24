import axios from 'axios'
const baseUrl = 'api/v1/todo'

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}




