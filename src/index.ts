"use strict"
import 'dotenv/config'
import express from 'express'
import connectDB from './utils/MongoDbConnection'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import UserController from './controller/UsersController'
import LoginController from './controller/LoginController'

async function startServer() { 
    try {

      await connectDB()

      const app = express()
      app.use(morgan('dev'))
      app.use(bodyParser.json())

      const port = process.env.PORT || 3000
      const apiRouter = express.Router()
      
      // Define routes
      apiRouter.use('/users', UserController)
      apiRouter.use('/login', LoginController)

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
