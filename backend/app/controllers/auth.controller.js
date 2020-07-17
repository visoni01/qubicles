import VerifyTokenMethod from '../services/user/verifyToken'
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
}
