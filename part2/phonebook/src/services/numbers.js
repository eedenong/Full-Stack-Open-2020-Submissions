import axios from 'axios'
const baseUrl = '/api/persons'

//getAll 
const getAll = () => {
    const request = axios.get(baseUrl)
    //return the promise containing the response data
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person);
    return request.then(response => response.data )
}

const remove = (id) => {
    // remove from database using the person's id
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log('response data from delete request is ', response.data);
    })
}

const edit = (newPerson) => {
    const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
    return request.then(response => {
        console.log('response data from edit is ', response.data);
        return response.data
    })
}

export default {
    getAll,
    create,
    remove,
    edit
}