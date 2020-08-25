import Responder from '../../server/expressResponder'
import CreateUserWithInvite from '../services/user/createUser'
import { InviteWithGoogleAuthService, InviteWithGoogleCallbackService } from '../services/user/invite/inviteWithGoogle'
import HandleInviteLink from '../services/user/invite/handleInvitelink'
import InviteManual from '../services/user/invite/inviteManualEmail'
import CheckrInvitationService from '../services/authentication/checkrInvitation'

export default class UserController {
  static async signUp (req, res) {
    const createUserResult = await CreateUserWithInvite.execute(req.body)
    if (createUserResult.successful) {
      Responder.success(res, createUserResult.result)
    } else {
      Responder.failed(res, createUserResult.errors)
    }
  }

  static async logout (req, res) {
    try {
      res.clearCookie('access_token')
      Responder.success(res, 'User logged out successfully!!')
    } catch (err) {
      Responder.failed(res)
    }
  }

  static async inviteWithGoogle (req, res) {
    const inviteWithGoogleResult = await InviteWithGoogleAuthService.execute(req.body)
    if (inviteWithGoogleResult.successful) {
      Responder.success(res, inviteWithGoogleResult.result)
    } else {
      Responder.failed(res, inviteWithGoogleResult.errors)
    }
  }

  static async inviteWithGoogleCallback (req, res) {
    const inviteWithGoogleCbResult = await InviteWithGoogleCallbackService.execute(req.query)
    if (inviteWithGoogleCbResult.successful) {
      Responder.success(res, inviteWithGoogleCbResult.result)
    } else {
      Responder.failed(res, inviteWithGoogleCbResult.errors)
    }
  }

  static async handleInviteLink (req, res) {
    const handleInviteLinkResult = await HandleInviteLink.execute(req.params)
    if (handleInviteLinkResult.successful) {
      Responder.success(res, handleInviteLinkResult.result)
    } else {
      Responder.failed(res, handleInviteLinkResult.errors)
    }
  }

  static async inviteManual (req, res) {
    const inviteManualResult = await InviteManual.execute(req.body)
    if (inviteManualResult.successful) {
      Responder.success(res, inviteManualResult.result)
    } else {
      Responder.failed(res, inviteManualResult.errors)
    }
  }

  static async checkrInvitation (req, res) {
    const checkrInvitationResult = await CheckrInvitationService.execute(req.body)
    if (checkrInvitationResult.successful) {
      Responder.success(res, checkrInvitationResult.result)
    } else {
      Responder.failed(res, checkrInvitationResult.errors)
    }
  }
}
