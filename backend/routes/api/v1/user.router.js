import express from 'express'
import userController from '../../../app/controllers/user.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import passport from 'passport'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/signup')
  .post(userController.signUp)

userRouter.route('/invite-with-google')
  .get(isAuthenticated, userController.inviteWithGoogle)

userRouter.route('/invite/callback')
  .get(userController.inviteWithGoogleCallback)

userRouter.route('/invite-manual')
  .post(isAuthenticated, userController.inviteManual)

userRouter.route('/invite/:walletId')
  .get(userController.handleInviteLink)

userRouter.route('/login')
  .post(function (req, res) {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(401).json({ message: err })
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return res.status(401).send(loginErr)
        }
        res.cookie('access_token', req.user.accessToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true
        })
        return res.status(200).json({ message: 'User logged in Successfully!!' })
      })
    })(req, res)
  })

export { userRouter }
