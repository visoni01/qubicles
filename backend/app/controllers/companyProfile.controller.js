import Responder from '../../server/expressResponder'
import {
  GetCompanyProfileSettingsService,
  UpdateCompanyProfileSettingsService,
  CompanyDetailsService,
  PostCompanyReviewService,
  GetCompanyRatingsService,
  GetCompanyReviewsService
 } from '../services/profile/company'

export default class CompanyProfileController {
  static async getCompanyProfileSettings (req, res) {
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

  static async postCompanyReview (req, res) {
    const companyReviewResult = await PostCompanyReviewService.execute({ ...req.body, ...req.params })
    if (companyReviewResult.successful) {
      Responder.success(res, companyReviewResult.result)
    } else {
      Responder.failed(res, companyReviewResult.errors)
    }
  }

  static async getCompanyRatings (req, res) {
    const companyRatingsResult = await GetCompanyRatingsService.execute({ ...req.body, ...req.params })
    if (companyRatingsResult.successful) {
      Responder.success(res, companyRatingsResult.result)
    } else {
      Responder.failed(res, companyRatingsResult.errors)
    }
  }

  static async getCompanyReviews (req, res) {
    const companyReviewResult = await GetCompanyReviewsService.execute({ ...req.body, ...req.params, ...req.query })
    if (companyReviewResult.successful) {
      Responder.success(res, companyReviewResult.result)
    } else {
      Responder.failed(res, companyReviewResult.errors)
    }
  }
}
