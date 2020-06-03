import express from 'express'
import userEmployerController from '../../../app/controllers/userEmployer.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const userEmployerRouter = express.Router(args)

userEmployerRouter.route('/postSignup/:step')
  .post(isAuthenticated, userEmployerController.postSignupEmployer)

export { userEmployerRouter }
