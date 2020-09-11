import express from 'express'
import passport from 'passport'
import authController from '../../../app/controllers/auth.controller'
import config from '../../../config/app'
import { handleSocialLogin } from '../../../app/middlewares/handleSocialLogin'
import { isCheckrWebhook } from '../../../app/middlewares/checkrWebhook'

const args = { mergeParams: true }
const authRouter = express.Router(args)

authRouter.route('/facebook')
  .get(passport.authenticate('facebook', { scope: ['email'] }))

authRouter.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    failureRedirect: `${config.get('webApp.baseUrl')}/signup`
  }), handleSocialLogin)

authRouter.route('/twitter')
  .get(passport.authenticate('twitter'))

authRouter.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    failureRedirect: `${config.get('webApp.baseUrl')}/signup`
  }), handleSocialLogin)

authRouter.route('/linkedin')
  .get(passport.authenticate('linkedin', {
    state: 'SOME STATE'
  }))

authRouter.route('/linkedin/callback')
  .get(passport.authenticate('linkedin', {
    failureRedirect: `${config.get('webApp.baseUrl')}/signup`
  }), handleSocialLogin)

authRouter.route('/verify-token/:token')
  .get(authController.verifyToken)

authRouter.route('/send-verification-mail')
  .post(authController.sendVerificationMail)

authRouter.route('/checkr-webhook')
  .post(isCheckrWebhook, authController.checkrEvent)

export { authRouter }
