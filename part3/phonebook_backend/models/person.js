const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// get the uri of the database
const url = process.env.MONGODB_URI

//connect to database
console.log('connecting to phonebook database ', url)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB (phonebook)')
  })
  .catch(error => {
    console.log('error connecting to MongoDB (Phonebook):', error.message)
  })

//define personSchema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    unique: true
  }
})

//Apply uniqueValidator plugin to use schema
personSchema.plugin(uniqueValidator)

// set toJSON method of schema
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)