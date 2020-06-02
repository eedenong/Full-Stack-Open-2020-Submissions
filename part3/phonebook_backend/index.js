const express = require('express')
const morgan = require('morgan')
const cors = require('cors') 
const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
    },
    {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
    },
    {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
    },
    {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
    },
    {
    name: "lol-pallo",
    number: "1",
    id: 6
    },
    {
    name: "Juha",
    number: "123123",
    id: 8
    }

]

const getInfoPage = () => {
    const date = new Date()
    const size = persons.length
    return `<div>
    <p>Phonebook has info for ${size} people</p>
    <p>${date}</p>
</div>`
        
}

//get all persons
app.get('/api/persons', (request, response) =>  response.json(persons))

//info page
app.get('/info', (request, response) => 
    response.send(getInfoPage())
)

//get info for single person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p =>  p.id === id)
    if (person) {
        token(request, response)
        response.json(person)
    } else {
        
        response.status(404).end()
    }
})

//delete request for person of specified id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //update the list to exclude the deleted person
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

function generateRandomId() {
    return Math.floor(Math.random() * 10 ) + 1
}

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

    //check if the number already exists in persons
    const dupeName = persons.find(p => p.name === name)
    if (dupeName) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateRandomId()
    }

   
    persons.concat(person)
    response.json(person)

})

const token = morgan.token('body', (request, response) => {
    const body = JSON.stringify(request.body)
    if (body === "{}") {
        return ""
    } else {
        return body
    }
})



const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`application listening on port ${PORT}`);