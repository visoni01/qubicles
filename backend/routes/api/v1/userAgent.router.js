import express from 'express'
import userAgentController from '../../../app/controllers/userAgent.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import multer from 'multer'

const args = { mergeParams: true }
const userAgentRouter = express.Router(args)
const multerUpload = multer()

userAgentRouter.route('/post-signup/:step')
  .post(multerUpload.single('file'), isAuthenticated, userAgentController.postSignupAgent)

export { userAgentRouter }
