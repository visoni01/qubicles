import express from 'express'
import userController from '../../../app/controllers/user.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import passport from 'passport'
import config from '../../../config/app'
import Responder from '../../../server/expressResponder'

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
          maxAge: config.get('cookieMaxAge')
        })
        // TODO:- Check this on the basis of 'is_post_signup_completed' in x_user_details table
        res.cookie('is_post_signup_completed', 1, {
          maxAge: config.get('cookieMaxAge')
        })
        Responder.success(res, 'User logged in Successfully!!')
      })
    })(req, res)
  })

userRouter.route('/logout')
  .post(userController.logout)

userRouter.route('/profile')
  .get(isAuthenticated, (req, res) => {
    res.status(200).json(req.user)
  })

userRouter.route('/checkr-invitation')
  .get(isAuthenticated, userController.checkrInvitation)

export { userRouter }
