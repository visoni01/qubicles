import express from 'express'
import passport from 'passport'

const args = { mergeParams: true }
const authRouter = express.Router(args)

authRouter.route('/facebook')
  .get(passport.authenticate('facebook', {}))

authRouter.route('/facebook/callback')
  .get(passport.authenticate('facebook', { failureRedirect: '/'}))

export { authRouter }
