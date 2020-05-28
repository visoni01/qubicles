import express from 'express'
import userController from '../../../app/controllers/user.controller'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/signup')
  .post(userController.signUp)

userRouter.route('/invite')
  .get(userController.invite)

userRouter.route('/invite/callback')
  .get(userController.inviteResponse)

export { userRouter }
