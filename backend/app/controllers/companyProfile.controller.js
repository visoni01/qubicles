import Responder from '../../server/expressResponder'
import { GetCompanyProfileSettingsService } from '../services/profile/company/getProfileSettings'
import { UpdateCompanyProfileSettingsService } from '../services/profile/company/updateProfileSettings'

export default class CompanyProfileController {
  static async getProfileSettings (req, res) {
    const profileSettings = await GetCompanyProfileSettingsService.execute({ ...req.body })
    if (profileSettings.successful) {
      Responder.success(res, profileSettings.result)
    } else {
      Responder.failed(res, profileSettings.errors)
    }
  }

  static async updateProfileSettigns (req, res) {
    const updatedProfileSettings = await UpdateCompanyProfileSettingsService.execute({ ...req.body })
    if (updatedProfileSettings.successful) {
      Responder.success(res, updatedProfileSettings.result)
    } else {
      Responder.failed(res, updatedProfileSettings.errors)
    }
  }
}
