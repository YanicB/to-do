import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

export default { PORT, MONGODB_URI }
