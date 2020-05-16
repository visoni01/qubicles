import './router'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import expressBoom from 'express-boom'
import passport from 'passport'

import routesInitiator from '../routes'
import db from '../app/db/models'
import initPassport from '../app/middlewares/passport'
import logger from '../app/common/logger'

// Initialize express app
const app = express()

function initMiddleware () {
  // Enable cors
  app.use(cors())
  // Showing stack errors
  app.set('showStackError', true)

  // Configure view engine to render EJS templates.
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')

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

  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/', function (req, res) {
    res.render('login')
  })
}

function initDatabase () {
  db
    .sequelize
    .sync({ force: false })
    .then(function () {
      logger.info('You are connected to the database successfully.')
    })
}

export function init () {
  // Initialize Express middleware
  initMiddleware()

  // Initialize Passport
  initPassport()

  // Initialize modules server routes
  routesInitiator(app)

  // Initialize db
  initDatabase()

  return app
}
