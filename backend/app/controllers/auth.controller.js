import VerifyTokenMethod from '../services/user/verifyToken'
import Responder from '../../server/expressResponder'

export default class AuthController {
  static async verifyToken (req, res) {
    const exampleResult = await VerifyTokenMethod.execute(req.params)
    if (exampleResult.successful) {
      Responder.success(res, exampleResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', exampleResult.errors)
    }
  }
}
