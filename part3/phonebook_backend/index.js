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

const getInfoPage = () => {
    const date = new Date()
    const size = persons.length
    return `<div>
    <p>Phonebook has info for ${size} people</p>
    <p>${date}</p>
</div>`
        
}

//get all persons
app.get('/api/persons', (request, response, next) =>  {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

//info page
app.get('/info', (request, response) => 
    response.send(getInfoPage())
)

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
    // if content body not found, return a HTTP 404
    if (!body) {
        return response.status(404).json(
            {
                error:'content missing'
            }
        )
    }

    const name = body.name
    const number = body.number
    //check if the name or number is missing
    if (!name) {
        return response.status(400).json({
            error: 'missing name'
        })
    }
    if(!number) {
        return response.status(400).json({
            error: 'missing number'
        })
    }

    //create the Person
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    //save the newly created Person to database
    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))

})

//put request for updating a phone number
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name : body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new : true })
        .then(updatedPerson => {
            console.log('Person updated');
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
    }

    next(error)
}
//handler of requests with result to errors
app.use(errorHandler)

app.use(unknownEnpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`application listening on port ${PORT}`);