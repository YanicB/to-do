import mongoose from 'mongoose'

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


