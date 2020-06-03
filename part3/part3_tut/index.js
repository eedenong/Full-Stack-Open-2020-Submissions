require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const Note = require('./models/note')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
      response.json(note)
      } else {
        //if there is no such object found in db
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      return savedNote.toJSON()
    })
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }
  
  // the new parameter causes the event handler(then) to be called 
  // with the modified opbj
  Note.findByIdAndUpdate(request.params.id, note, { new : true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEnpoint = (request, response) => {
  response.status(404).send({ error:'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
//handler of requests with result to errors
app.use(errorHandler)

app.use(unknownEnpoint)

const PORT = process.env.PORT

app.listen(PORT)
console.log('Starting server...');
console.log(`Server running on port ${PORT}`);
