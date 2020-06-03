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
app.get('/api/persons', (request, response) =>  {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//info page
app.get('/info', (request, response) => 
    response.send(getInfoPage())
)

//get info for single person
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
        response.json(person)
    })
})

//delete request for person of specified id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //update the list to exclude the deleted person
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

//post request to add person
app.post('/api/persons', (request, response) => {
    //request.body gets the object specified in the create_person.rest file
    const body = request.body
    // if content body not found, return 
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
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

const token = morgan.token('body', (request, response) => {
    const body = JSON.stringify(request.body)
    if (body === "{}") {
        return ""
    } else {
        return body
    }
})



const PORT = process.env.PORT
app.listen(PORT)
console.log(`application listening on port ${PORT}`);