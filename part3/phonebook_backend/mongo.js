const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]
//check if an entry is provided
const newEntry = process.argv.length > 3

//database URI
const url =
    `mongodb+srv://fullstack:${password}@cluster0-f9ydo.mongodb.net/phonebook-app?retryWrites=true&w=majority`

//connect to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true })

//create Person schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (newEntry) {
  //create a new person
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  //save the person to the database
  person.save().then(() => {
    console.log('person succesfully saved!')
    mongoose.connection.close()
  })
} else {
  //find all the persons in the database
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}