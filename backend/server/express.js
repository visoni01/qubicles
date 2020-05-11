import './router'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import routesInitiator from '../routes'
import expressBoom from 'express-boom'

// Initialize express app
const app = express()

function initMiddleware () {
  // Enable cors
  app.use(cors())
  // Showing stack errors
  app.set('showStackError', true)

  app.use(expressBoom())

  // Enable logger (morgan)
  app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'))

  // Request body parsing middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(bodyParser.json({ limit: '1000mb' }))

  // To optimize the response performance
  app.use(compression())
}

export function init () {
  // Initialize Express middleware
  initMiddleware()

  // Initialize modules server routes
  routesInitiator(app)

  return app
}