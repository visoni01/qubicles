import './router'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import expressBoom from 'express-boom'
import passport from 'passport'

import initRoutes from '../routes'
import db from '../app/db/models'
import initPassport from '../app/middlewares/passport'
import logger from '../app/common/logger'
import path from 'path'
import config from '../config'

// Initialize express app
const app = express()
const allowCorsURLs = [/\.fenero\.com$/, /\.qubicles\.io$/]

// Check CORS URLs if environment is not development
const corsConfiguration = {
  origin: config.get('env') === 'development' ? '*' : allowCorsURLs,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

function initMiddleware () {
  // Enable cors
  app.use(cors(corsConfiguration))
  // Showing stack errors
  app.set('showStackError', true)

  // Configure view engine to render EJS templates.
  app.set('views', path.join(__dirname, 'views'))
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
  initRoutes(app)

  // Initialize db
  initDatabase()

  return app
}
