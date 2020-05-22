import Responder from '../../server/expressResponder'
import CreateUser from '../services/user/createUser'

export default class UserController {
  static async signUp (req, res) {
    const createUserResult = await CreateUser.execute(req.body)
    if (createUserResult.successful) {
      Responder.success(res, createUserResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', createUserResult.errors)
    }
  }
}
