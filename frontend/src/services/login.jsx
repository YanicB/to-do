import axios from 'axios'
const baseUrl = 'api/v1/login'


const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }
