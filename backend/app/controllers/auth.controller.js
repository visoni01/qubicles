import VerifyTokenMethod from '../services/user/verifyToken'
import Responder from '../../server/expressResponder'

export default class AuthController {
  static async verifyToken (req, res) {
    const verifyTokenResult = await VerifyTokenMethod.execute(req.params)
    if (verifyTokenResult.successful) {
      Responder.success(res, verifyTokenResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', verifyTokenResult.errors)
    }
  }
}
