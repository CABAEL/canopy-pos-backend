import mongoose from 'mongoose'

async function connectDB() {

    const DB_HOST = process.env.DB_HOST
    const DB_USER = process.env.DB_USER
    const DB_PASS = process.env.DB_PASS
    const DB_PORT = process.env.DB_PORT
    const DB_NAME = process.env.DB_NAME 
    const DB_URL =  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

    try {
        await mongoose.connect(DB_URL, {})
        console.log(`MongoDB database:"${DB_NAME}" connected!`)
    } catch (error) { 
        console.error('Failed to connect to MongoDB:', error) 
        process.exit(1)
    }
}

export default connectDB