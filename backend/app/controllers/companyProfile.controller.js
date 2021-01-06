import Responder from '../../server/expressResponder'
import { GetCompanyProfileSettingsService } from '../services/profile/company/getProfileSettings'
import { UpdateCompanyProfileSettingsService } from '../services/profile/company/updateProfileSettings'
import CompanyDetailsService from '../services/profile/company/companyDetails'

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

  static async getCompanyDetails (req, res) {
    const companyDetails = await CompanyDetailsService.execute({ ...req.body, ...req.params })
    if (companyDetails.successful) {
      Responder.success(res, companyDetails.result)
    } else {
      Responder.failed(res, companyDetails.errors)
    }
  }
}
