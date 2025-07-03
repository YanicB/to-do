import config from './utils/config.js'
import express from 'express'
import todoRouter from './controllers/todo.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'
import middleware from './utils/middleware.js'
const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())

// MIDDLEWARES
app.use(middleware.requestLogger)
app.use('/api/v1/todo', todoRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// START SERVER
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})

export default app

