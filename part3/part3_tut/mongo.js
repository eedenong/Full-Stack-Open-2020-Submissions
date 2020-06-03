const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

//accessing command line param using process.argv
const password = process.argv[2]

//database URI
const url = 
    `mongodb+srv://fullstack:${password}@cluster0-f9ydo.mongodb.net/note-app?retryWrites=true&w=majority`

//connect to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true })

//define schema for note i.e. defining how a note document will look like/be structured
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

//define the model
//first param is the name of the model, second param is the schema for the model
// the collection created will be the lowercase plural form of the model name
//models can be seen as "constructor functions" to create new JS objects based
//on the provided params
const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'This is another note!!!!!',
//     date: new Date(),
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close()
// })

Note.find({ important:true }).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})