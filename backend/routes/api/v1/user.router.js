import express from 'express'
import userController from '../../../app/controllers/user.controller'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import passport from 'passport'
import config from '../../../config/app'
import Responder from '../../../server/expressResponder'
import multer from 'multer'
const multerUpload = multer()

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/signup')
  .post(userController.signUp)

userRouter.route('/post-signup-employer-data')
  .get(isAuthenticated, userController.postSignUpEmployerDataController)

userRouter.route('/post-signup-agent-data')
  .get(isAuthenticated, userController.postSignUpCompanyDataController)

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
        return res.status(401).json({ message: err.message, errCode: err.code })
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return res.status(401).send(loginErr)
        }
        res.cookie('access_token', req.user.accessToken, {
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

userRouter.route('/update')
  .post(isAuthenticated, userController.updateUserDataController)

userRouter.route('/upload-profile-image')
  .post(multerUpload.single('file'), isAuthenticated, userController.updateProfileImage)

userRouter.route('/details/:user_details_id')
  .get(isAuthenticated, userController.getUserDetails)

userRouter.route('/follow/:user_to_follow_id')
  .put(isAuthenticated, userController.followUser)

userRouter.route('/block/:block_user_id')
  .put(isAuthenticated, userController.blockUser)

userRouter.route('/notifications')
  .get(isAuthenticated, userController.getNotifications)

userRouter.route('/notifications')
  .put(isAuthenticated, userController.readNotifications)

userRouter.route('/notifications/:notification_id')
  .delete(isAuthenticated, userController.deleteNotification)

userRouter.route('/companies')
  .get(isAuthenticated, userController.getUserCompanies)

userRouter.route('/search')
  .get(isAuthenticated, userController.getUsers)

export { userRouter }
