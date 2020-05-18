import Responder from '../../server/expressResponder'
import CreateUsersAgent from '../services/user/createUsersAgent'
import PostUsersAgent from '../services/user/postSignupAgent'

export default class UserAgentController {
  static async createUsersAgent (req, res) {
    const createUsersAgentResult = await CreateUsersAgent.execute(req.body)
    if (createUsersAgentResult.successful) {
      Responder.success(res, createUsersAgentResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', createUsersAgentResult.errors)
    }
  }

  static async postSignupAgent (req, res) {
    const postSignupAgentResult = await PostUsersAgent.execute(req.body)
    if (postSignupAgentResult.successful) {
      Responder.success(res, postSignupAgentResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', postSignupAgentResult.errors)
    }
  }
}
