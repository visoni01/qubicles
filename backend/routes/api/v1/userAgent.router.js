import express from 'express'
import userAgentController from '../../../app/controllers/userAgent.controller'

const args = { mergeParams: true }
const userAgentRouter = express.Router(args)

userAgentRouter.route('/create')
  .post(userAgentController.createUsersAgent)

export { userAgentRouter }
