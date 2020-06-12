import express from 'express'
import passport from 'passport'
import authController from '../../../app/controllers/auth.controller'
const args = { mergeParams: true }
const authRouter = express.Router(args)

authRouter.route('/facebook')
  .get(passport.authenticate('facebook', { scope: ['email'] }))

authRouter.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/signup?with_social=true',
    failureRedirect: 'http://localhost:3000/signup'
  }))

authRouter.route('/twitter')
  .get(passport.authenticate('twitter'))

authRouter.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: 'http://localhost:3000/signup?with_social=true',
    failureRedirect: 'http://localhost:3000/signup'
  }))

authRouter.route('/linkedin')
  .get(passport.authenticate('linkedin', {
    state: 'SOME STATE'
  }))

authRouter.route('/linkedin/callback')
  .get(passport.authenticate('linkedin', {
    successRedirect: 'http://localhost:3000/signup?with_social=true',
    failureRedirect: 'http://localhost:3000/signup'
  }))

authRouter.route('/verify-token/:token')
  .get(authController.verifyToken)

export { authRouter }
