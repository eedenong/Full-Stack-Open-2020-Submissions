const mongoose = require('mongoose')

// get the uri of the database
const url = process.env.MONGODB_URI

//connect to database
console.log('connecting to phonebook database ', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => {
        console.log('connected to MongoDB (phonebook)');
    })
    .catch(error => {
        console.log('error connecting to MongoDB (Phonebook):', error.message);
    })

//define personSchema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// set toJSON method of schema
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)