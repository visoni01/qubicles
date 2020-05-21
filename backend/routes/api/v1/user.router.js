import express from 'express'
import userController from '../../../app/controllers/user.controller'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/signup')
  .post(userController.signUp)

export { userRouter }
