import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.js'
import Todo from '../models/todo.js'
import assert from 'node:assert'

const api = supertest(app)

beforeEach(async () => {
    await Todo.deleteMany({})
    await Todo.insertMany(helper.initialTodos)
})

test('a valid todo can be added ', async () => {
    const newTodo = {
        content: 'async/await simplifies making async calls',
        completion: true,
    }

    await api
        .post('/api/v1/todo')
        .send(newTodo)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const todoAtEnd = await helper.todosInDb()
    assert.strictEqual(todoAtEnd.length, helper.initialTodos.length + 1)

    const contents = todoAtEnd.map(n => n.content)
    assert(contents.includes('async/await simplifies making async calls'))
})

test('todo without content is not added', async () => {
    const newTodo = {
        completion: false
    }

    await api
        .post('/api/v1/todo')
        .send(newTodo)
        .expect(400)

    const todoAtEnd = await helper.todosInDb()
    assert.strictEqual(todoAtEnd.length, helper.initialTodos.length)
})
beforeEach(async () => {
    await Todo.deleteMany({})
    let todoObject = new Todo(helper.initialTodos[0])
    await todoObject.save()
    todoObject = new Todo(helper.initialTodos[1])
    await todoObject.save()
})

test.only('all notes are returned', async () => {
    const response = await api.get('/api/v1/todo')

    assert.strictEqual(response.body.length, helper.initialTodos.length)
})

test.only('todos are returned as json', async () => {
    await api
        .get('/api/v1/todo')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/v1/todo')

    assert.strictEqual(response.body.length, helper.initialTodos.length)
})
test('a specific todo is within the returned notes', async () => {
    const response = await api.get('/api/v1/todo')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('HTML is easy'), true)
})

test('a specific todo can be viewed', async () => {
    const todoAtStart = await helper.todosInDb()
    const todoToView = todoAtStart[0]

    const result = await api
        .get(`/api/v1/todo/${todoToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(result.body, todoToView)
})

test('a todo can be deleted', async () => {
    const todoAtStart = await helper.todosInDb()
    const todoToDelete = todoAtStart[0]

    const result = await api
        .delete(`/api/v1/todo/${todoToDelete.id}`)
        .expect(204)

    const todoAtEnd = await helper.todosInDb()

    const contents = todoAtEnd.map(n => n.content)
    assert(!contents.includes(todoToDelete.content))

    assert.strictEqual(todoAtEnd.length, helper.initialTodos.length - 1)

})
after(async () => {
    await mongoose.connection.close()
})

