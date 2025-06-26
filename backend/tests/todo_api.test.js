import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Todo from '../models/todo.js'

const api = supertest(app)

const initialTodos = [
    {
        content: 'HTML is easy',
        completion: false,
    },
    {
        content: 'Browser can execute only javascript',
        completion: true,
    },
]

beforeEach(async () => {
    await Todo.deleteMany({})
    let todoObject = new Todo(initialTodos[0])
    await todoObject.save()
    todoObject = new Todo(initialTodos[1])
    await todoObject.save()
})

test('todos are returned as json', async () => {
    await api
        .get('/api/v1/todo')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/v1/todo')

    assert.strictEqual(response.body.length, 2)
})
test('a specific todo is within the returned notes', async () => {
    const response = await api.get('/api/v1/todo')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('HTML is easy'), true)
})


after(async () => {
    await mongoose.connection.close()
})

