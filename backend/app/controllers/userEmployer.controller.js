import Responder from '../../server/expressResponder'
import PostUsersEmployer from '../services/user/postSignupEmployer'

export default class UserEmployerController {
  static async postSignupEmployer (req, res) {
    const postSignupEmployerResult = await PostUsersEmployer.execute(req.body)
    if (postSignupEmployerResult.successful) {
      Responder.success(res, postSignupEmployerResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', postSignupEmployerResult.errors)
    }
  }
}
