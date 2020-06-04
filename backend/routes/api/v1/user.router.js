import express from 'express'
import userController from '../../../app/controllers/user.controller'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/signup')
  .post(userController.signUp)

userRouter.route('/inviteWithGoogle')
  .get(userController.inviteWithGoogle)

userRouter.route('/invite/callback')
  .get(userController.inviteWithGoogleCallback)

userRouter.route('/inviteManual')
  .post(userController.inviteManual)

userRouter.route('/invite/:walletId')
  .get(userController.handleInviteLink)

export { userRouter }
