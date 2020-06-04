import Responder from '../../server/expressResponder'
import CreateUserWithInvite from '../services/user/createUser'
import { InviteWithGoogleAuthService, InviteWithGoogleCallbackService } from '../services/user/invite/inviteWithGoogle'
import HandleInviteLink from '../services/user/invite/handleInvitelink'
import InviteManual from '../services/user/invite/inviteManualEmail'

export default class UserController {
  static async signUp (req, res) {
    const createUserResult = await CreateUserWithInvite.execute(req.body)
    if (createUserResult.successful) {
      Responder.success(res, createUserResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', createUserResult.errors)
    }
  }

  static async inviteWithGoogle (req, res) {
    const inviteWithGoogleResult = await InviteWithGoogleAuthService.execute(req.body)
    if (inviteWithGoogleResult.successful) {
      Responder.success(res, inviteWithGoogleResult.result)
    } else {
      res.boom.badRequest('Invitation Failed', inviteWithGoogleResult.errors)
    }
  }

  static async inviteWithGoogleCallback (req, res) {
    const inviteWithGoogleCbResult = await InviteWithGoogleCallbackService.execute(req.query)
    if (inviteWithGoogleCbResult.successful) {
      Responder.success(res, inviteWithGoogleCbResult.result)
    } else {
      res.boom.badRequest('Invitation Response Failed', inviteWithGoogleCbResult.errors)
    }
  }

  static async handleInviteLink (req, res) {
    const handleInviteLinkResult = await HandleInviteLink.execute(req.params)
    if (handleInviteLinkResult.successful) {
      Responder.success(res, handleInviteLinkResult.result)
    } else {
      res.boom.badRequest('Invitation Response Failed', handleInviteLinkResult.errors)
    }
  }

  static async inviteManual (req, res) {
    const inviteManualResult = await InviteManual.execute(req.body)
    if (inviteManualResult.successful) {
      Responder.success(res, inviteManualResult.result)
    } else {
      res.boom.badRequest('Invitation Response Failed', inviteManualResult.errors)
    }
  }
}
