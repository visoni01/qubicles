import Responder from '../../server/expressResponder'
import CheckrInvitationService from '../services/authentication/checkrInvitation'
import { SUCCESS_MESSAGES } from '../utils/success'
import {
  CreateUserService,
  InviteWithGoogleAuthService,
  InviteWithGoogleCallbackService,
  HandleInviteLinkService,
  InviteManualService,
  UpdateUserDataService,
  PostSignUpEmployerDataService,
  PostSignUpAgentDataService,
  UploadProfileImageService,
  UserFollowService,
  UserBlockService,
  UserGetNotificationsService,
  UserReadNotificationsService,
  UserDeleteNotificationService,
  GetUserCompaniesService,
  SearchUsersService
} from '../services/user'
import { getNewTokenAfterUserCodeChanged } from '../services/helper'
import config from '../../config/app'
import UserDetailsService from '../services/user/getUserDetails'

export default class UserController {
  static async signUp (req, res) {
    const createUserResult = await CreateUserService.execute(req.body)
    if (createUserResult.successful) {
      Responder.success(res, createUserResult.result)
    } else {
      Responder.failed(res, createUserResult.errors)
    }
  }

  static async logout (req, res) {
    try {
      res.clearCookie('access_token')
      Responder.success(res, SUCCESS_MESSAGES.LOGOUT)
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
      res.redirect(`${config.get('webApp.baseUrl')}/invite-gmail/callback`)
    } else {
      Responder.failed(res, inviteWithGoogleCbResult.errors)
    }
  }

  static async handleInviteLink (req, res) {
    const handleInviteLinkResult = await HandleInviteLinkService.execute(req.params)
    if (handleInviteLinkResult.successful) {
      Responder.success(res, handleInviteLinkResult.result)
    } else {
      Responder.failed(res, handleInviteLinkResult.errors)
    }
  }

  static async inviteManual (req, res) {
    const inviteManualResult = await InviteManualService.execute(req.body)
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
    const PostSignUpCompanyData = await PostSignUpAgentDataService.execute(req.body)
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

  static async updateProfileImage (req, res) {
    const UploadProfileImage = await UploadProfileImageService.execute({ ...req.body, file: req.file })
    if (UploadProfileImage.successful) {
      Responder.success(res, UploadProfileImage.result)
    } else {
      Responder.failed(res, UploadProfileImage.errors)
    }
  }

  static async getUserDetails (req, res) {
    const userDetails = await UserDetailsService.execute({ ...req.body, ...req.params })
    if (userDetails.successful) {
      Responder.success(res, userDetails.result)
    } else {
      Responder.failed(res, userDetails.errors)
    }
  }

  static async followUser (req, res) {
    const hasFollowed = await UserFollowService.execute({ ...req.body, ...req.params })
    if (hasFollowed.successful) {
      Responder.success(res, hasFollowed.result)
    } else {
      Responder.failed(res, hasFollowed.errors)
    }
  }

  static async blockUser (req, res) {
    const hasBlocked = await UserBlockService.execute({ ...req.body, ...req.params })
    if (hasBlocked.successful) {
      Responder.success(res, hasBlocked.result)
    } else {
      Responder.failed(res, hasBlocked.errors)
    }
  }

  static async getNotifications (req, res) {
    const notifications = await UserGetNotificationsService.execute({ ...req.body, ...req.query })
    if (notifications.successful) {
      Responder.success(res, notifications.result)
    } else {
      Responder.failed(res, notifications.errors)
    }
  }

  static async readNotifications (req, res) {
    const data = await UserReadNotificationsService.execute({ ...req.body })
    if (data.successful) {
      Responder.success(res, data.result)
    } else {
      Responder.failed(res, data.errors)
    }
  }

  static async deleteNotification (req, res) {
    const notification = await UserDeleteNotificationService.execute({ ...req.body, ...req.params })
    if (notification.successful) {
      Responder.success(res, notification.result)
    } else {
      Responder.failed(res, notification.errors)
    }
  }

  static async getUserCompanies (req, res) {
    const companiesList = await GetUserCompaniesService.execute({ ...req.params, ...req.body })
    if (companiesList.successful) {
      Responder.success(res, companiesList.result)
    } else {
      Responder.failed(res, companiesList.errors)
    }
  }

  static async getUsers (req, res) {
    const searchResults = await SearchUsersService.execute({ ...req.body, ...req.query })
    if (searchResults.successful) {
      Responder.success(res, searchResults.result)
    } else {
      Responder.failed(res, searchResults.errors)
    }
  }
}
