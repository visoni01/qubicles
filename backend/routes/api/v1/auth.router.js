import express from 'express'
import passport from 'passport'

const args = { mergeParams: true }
const authRouter = express.Router(args)

authRouter.route('/facebook')
  .get(passport.authenticate('facebook', { scope: ['email'] }))

authRouter.route('/facebook/callback')
  .get(passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.send('Home');
  })

authRouter.route('/twitter')
  .get(passport.authenticate('twitter'))

authRouter.route('/twitter/callback')
  .get(passport.authenticate('twitter', { failureRedirect: '/' }), function (req, res) {
    res.render('home', { user: req.user })
  })

authRouter.route('/linkedin')
  .get(passport.authenticate('linkedin', { state: 'SOME STATE' }))

authRouter.route('/linkedin/callback')
  .get(passport.authenticate('linkedin', { successRedirect: '/', failureRedirect: '/login' }), (req, res) => {
  })

export { authRouter }
