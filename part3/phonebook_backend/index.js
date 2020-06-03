require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors') 
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//get all persons
app.get('/api/persons', (request, response, next) =>  {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

//info page
app.get('/info', (request, response, next) => {
    const date = new Date()
    Person.estimatedDocumentCount({})
        .then(count => {
            console.log('count is: ', count);
            const size = count
            response.send(
                `<div>
                <p>Phonebook has info for ${size} people</p>
                <p>${date}</p>
                </div>`
            )
        })
        .catch(error => next(error))
    
})

//get info for single person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person =>{
            response.json(person)
        })
        .catch(error => next(error))
})

//delete request for person of specified id
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//post request to add person
app.post('/api/persons', (request, response, next) => {
    //request.body gets the object specified in the create_person.rest file
    const body = request.body

    //create the Person
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    //save the newly created Person to database
    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))

})

//put request for updating a phone number
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findOneAndUpdate(
        { _id: request.params.id }, 
        { number: body.number }, 
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
}) 

const token = morgan.token('body', (request, response) => {
    const body = JSON.stringify(request.body)
    if (body === "{}") {
        return ""
    } else {
        return body
    }
})

const unknownEnpoint = (request, response) => {
    response.status(404).send({ error:'unknown endpoint'})
  }
  
const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}
//handler of requests with result to errors
app.use(errorHandler)

app.use(unknownEnpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`application listening on port ${PORT}`);