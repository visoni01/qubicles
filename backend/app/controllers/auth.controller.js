import VerifyTokenMethod from '../services/user/verifyToken'
import SendVerificationMailService from '../services/user/sendVerificationMail'
import HandleCheckrEventService from '../services/authentication/handleCheckrEvents'
import ForgetPasswordMailService from '../services/user/sendForgetPasswordMail'
import config from '../../config/app'
import Responder from '../../server/expressResponder'
import { SUCCESS_MESSAGES } from '../utils/success'
import { ResetPasswordService } from '../services/user/resetPassword'

export default class AuthController {
  static async verifyToken (req, res) {
    const verifyTokenResult = await VerifyTokenMethod.execute(req.params)
    if (verifyTokenResult.successful) {
      if (verifyTokenResult.result.accessToken) {
        res.cookie('access_token', verifyTokenResult.result.accessToken, {
          maxAge: config.get('cookieMaxAge')
        })
      }
      Responder.success(res, verifyTokenResult.result)
    } else {
      Responder.failed(res, verifyTokenResult.errors)
    }
  }

  static async sendVerificationMail (req, res) {
    const sendVerificationMailResult = await SendVerificationMailService.execute(req.body)
    if (sendVerificationMailResult.successful) {
      Responder.success(res, SUCCESS_MESSAGES.SEND_VERIFICATION_EMAIL)
    } else {
      Responder.failed(res, sendVerificationMailResult.errors)
    }
  }

  static async checkrEvent (req, res) {
    const checkrEventResult = await HandleCheckrEventService.execute(req.body)
    if (checkrEventResult.successful) {
      Responder.success(res, SUCCESS_MESSAGES.HANDLE_CHECKR_EVENT)
    } else {
      Responder.failed(res, checkrEventResult.errors)
    }
  }

  static async sendForgetPasswordMail (req, res) {
    const sendForgetPasswordMailResult = await ForgetPasswordMailService.execute(req.body)
    if (sendForgetPasswordMailResult.successful) {
      Responder.success(res, SUCCESS_MESSAGES.SEND_FORGET_PASSWORD_EMAIL)
    } else {
      Responder.failed(res, sendForgetPasswordMailResult.errors)
    }
  }

  static async resetPassword (req, res) {
    const resetPasswordResult = await ResetPasswordService.execute(req.body)
    if (resetPasswordResult.successful) {
      Responder.success(res, SUCCESS_MESSAGES.PASSWORD_UPDATED_SUCCESSFULLY)
    } else {
      Responder.failed(res, resetPasswordResult.errors)
    }
  }
}
