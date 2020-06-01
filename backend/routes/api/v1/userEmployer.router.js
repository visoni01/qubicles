import express from 'express'
import userEmployerController from '../../../app/controllers/userEmployer.controller'

const args = { mergeParams: true }
const userEmployerRouter = express.Router(args)

userEmployerRouter.route('/postSignup/:step')
  .post(userEmployerController.postSignupEmployer)

export { userEmployerRouter }
