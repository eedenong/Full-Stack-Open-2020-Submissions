const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url);

//connect to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false })
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDD:', error.message);
    })

//define noteScheme
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)