import VerifyTokenMethod from '../services/user/verifyToken'
import SendVerificationMailService from '../services/user/sendVerificationMail'
import HandleCheckrEventService from '../services/authentication/handleCheckrEvents'
import config from '../../config/app'
import Responder from '../../server/expressResponder'

export default class AuthController {
  static async verifyToken (req, res) {
    const verifyTokenResult = await VerifyTokenMethod.execute(req.params)
    if (verifyTokenResult.successful) {
      res.cookie('access_token', verifyTokenResult.result.accessToken, {
        maxAge: config.get('cookieMaxAge')
      })
      Responder.success(res, 'User email verified Successfully!!')
    } else {
      Responder.failed(res, verifyTokenResult.errors)
    }
  }

  static async sendVerificationMail (req, res) {
    const sendVerificationMailResult = await SendVerificationMailService.execute(req.body)
    if (sendVerificationMailResult.successful) {
      Responder.success(res, 'Verification email sent successfully!')
    } else {
      Responder.failed(res, sendVerificationMailResult.errors)
    }
  }

  static async checkrEvent (req, res) {
    const checkrEventResult = await HandleCheckrEventService.execute(req.body)
    if (checkrEventResult.successful) {
      Responder.success(res, 'Event Handled Successfully')
    } else {
      Responder.failed(res, checkrEventResult.errors)
    }
  }
}
