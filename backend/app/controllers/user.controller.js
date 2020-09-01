import Responder from '../../server/expressResponder'
import CreateUserWithInvite from '../services/user/createUser'
import { InviteWithGoogleAuthService, InviteWithGoogleCallbackService } from '../services/user/invite/inviteWithGoogle'
import HandleInviteLink from '../services/user/invite/handleInvitelink'
import InviteManual from '../services/user/invite/inviteManualEmail'
import CheckrInvitationService from '../services/authentication/checkrInvitation'
import PostSignUpEmployerDataService from '../services/user/employer/postSignUpEmployerData'
import PostSignUpCompanyDataService from '../services/user/agent/postSignUpCompanyData'
import UpdateUserDataService from '../services/user/updateUserDataService'
import { getNewTokenAfterUserCodeChanged } from '../services/helper'
import config from '../../config/app'

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

  static async postSignUpEmployerDataController (req, res) {
    const postSignUpEmployerDataResult = await PostSignUpEmployerDataService.execute(req.body)
    if (postSignUpEmployerDataResult.successful) {
      Responder.success(res, postSignUpEmployerDataResult.result)
    } else {
      Responder.failed(res, postSignUpEmployerDataResult.errors)
    }
  }

  static async postSignUpCompanyDataController (req, res) {
    const PostSignUpCompanyData = await PostSignUpCompanyDataService.execute(req.body)
    if (PostSignUpCompanyData.successful) {
      Responder.success(res, PostSignUpCompanyData.result)
    } else {
      Responder.failed(res, PostSignUpCompanyData.errors)
    }
  }

  static async updateUserDataController (req, res) {
    const updateUserDataService = await UpdateUserDataService.execute(req.body)
    if (req.body.update_user_code) {
      const token = await getNewTokenAfterUserCodeChanged({
        ...req.user,
        user_code: req.body.data.user_code
      })
      res.cookie('access_token', token, {
        maxAge: config.get('cookieMaxAge')
      })
    }
    if (updateUserDataService.successful) {
      Responder.success(res, updateUserDataService.result)
    } else {
      Responder.failed(res, updateUserDataService.errors)
    }
  }
}
