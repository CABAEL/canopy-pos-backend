"use strict"
import 'dotenv/config'
import express from 'express'
import connectDB from './utils/MongoDbConnection'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import UserController from './controller/UsersController'
import LoginController from './controller/LoginController'
import cors from 'cors'

import verifyToken from './middleware/VerifyToken'

async function startServer() {
    try {

        await connectDB()

        const app = express()
        app.use(morgan('dev'))
        app.use(bodyParser.json())
        // Configure CORS to allow requests from http://localhost:3001
        const corsOptions = {
            origin: 'http://localhost:3001',
            optionsSuccessStatus: 200 // Some legacy browsers choke on 204
        };
        app.use(cors());



        const port = process.env.PORT || 3000
        const apiRouter = express.Router()

        // Define routes
        apiRouter.use('/login', LoginController)
        apiRouter.use('/users', verifyToken, UserController)

        app.use('/api', apiRouter)


        app.listen(port, () => {
            console.log(`Server running at ${process.env.HOST}:${port}`)
        })

    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
