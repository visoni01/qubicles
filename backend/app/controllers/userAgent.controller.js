import Responder from '../../server/expressResponder'
import PostSignupAgent from '../services/user/postSignupAgent'

export default class UserAgentController {
  static async postSignupAgent (req, res) {
    const postSignupAgentResult = await PostSignupAgent.execute(req.body)
    if (postSignupAgentResult.successful) {
      Responder.success(res, postSignupAgentResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', postSignupAgentResult.errors)
    }
  }
}
