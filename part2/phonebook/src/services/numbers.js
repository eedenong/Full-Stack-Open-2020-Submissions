import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

//getAll 
const getAll = () => {
    const request = axios.get(baseUrl)
    //return the promise containing the response data
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

export default {
    getAll,
    create
}