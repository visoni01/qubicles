import express from 'express'
import userController from '../../../app/controllers/user.controller'
import passport from 'passport'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/signup')
  .post(userController.signUp)

userRouter.route('/invite-with-google')
  .get(userController.inviteWithGoogle)

userRouter.route('/invite/callback')
  .get(userController.inviteWithGoogleCallback)

userRouter.route('/invite-manual')
  .post(userController.inviteManual)

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
        return res.status(200).json({ 'access-token': req.user.accessToken, message: 'User logged in Successfully!!' })
      })
    })(req, res)
  })

export { userRouter }
