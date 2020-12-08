import Responder from '../../server/expressResponder'
import { GetCompanyProfileSettingsService } from '../services/profile/company/getProfileSettings'

export default class CompanyProfileController {
  static async getProfileSettings (req, res) {
    const profileSettings = await GetCompanyProfileSettingsService.execute({ ...req.body })
    if (profileSettings.successful) {
      Responder.success(res, profileSettings.result)
    } else {
      Responder.failed(res, profileSettings.errors)
    }
  }
}
