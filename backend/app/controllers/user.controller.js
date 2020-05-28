import Responder from '../../server/expressResponder'
import CreateUser from '../services/user/createUser'
import Invite from '../services/user/inviteFriends'
import InviteResponse from '../services/user/inviteResponse'

export default class UserController {
  static async signUp (req, res) {
    const createUserResult = await CreateUser.execute(req.body)
    if (createUserResult.successful) {
      Responder.success(res, createUserResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', createUserResult.errors)
    }
  }

  static async invite (req, res) {
    const inviteResult = await Invite.execute(req.body)
    if (inviteResult.successful) {
      Responder.success(res, inviteResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', inviteResult.errors)
    }
  }

  static async inviteResponse (req, res) {
    const inviteResponseResult = await InviteResponse.execute(req.query)
    if (inviteResponseResult.successful) {
      Responder.success(res, inviteResponseResult.result)
    } else {
      res.boom.badRequest('Invitation Response Failed', inviteResponseResult.errors)
    }
  }
}
