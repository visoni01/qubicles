import express from 'express'
import userAgentController from '../../../app/controllers/userAgent.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const userAgentRouter = express.Router(args)

userAgentRouter.route('/post-signup/:step')
  .post(isAuthenticated, userAgentController.postSignupAgent)

export { userAgentRouter }
