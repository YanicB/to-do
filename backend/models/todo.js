import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log(`Error found: ${error}`)
    })

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    completion: Boolean,
})

todoSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo


