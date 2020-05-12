import Responder from '../../server/expressResponder'
import CreateUsersAgent from '../services/user/createUsersAgent'

export default class UserAgentController {
  static async createUsersAgent (req, res) {
    const createUsersAgentResult = await CreateUsersAgent.execute(req.body)
    if (createUsersAgentResult.successful) {
      Responder.success(res, createUsersAgentResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', createUsersAgentResult.errors)
    }
  }
}
