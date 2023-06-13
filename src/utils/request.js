import axios from 'axios'


const apiUrl = 'http://localhost:8080/api/v1'

const service = axios.create({
    baseURL: apiUrl,
    timeout: 30 * 1000
})

export default service
