import mongoose from 'mongoose'

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://todouser:${password}@cluster0.9rfxcrd.mongodb.net/something?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
const todoSchema = new mongoose.Schema({
    content: String,
    completion: Boolean,
})

const Todo = mongoose.model('Todo', todoSchema)

if (process.argv.length == 5) {
    const todo = new Todo({
        content: process.argv[3],
        completion: process.argv[4].toLowerCase() === 'true',
    })
    todo.save().then(result => {
        console.log(`added ${result.content}, with completion ${result.completion}`)
        mongoose.connection.close()
    })
} else {
    Todo.find({}).then(result => {
        result.forEach(todo => {
            console.log(todo)
        })
        mongoose.connection.close()
    })
}
