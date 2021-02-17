import express from 'express'
import CompanyProfileController from '../../../app/controllers/companyProfile.controller'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const companyProfileRouter = express.Router(args)

companyProfileRouter.route('/settings')
  .get(isAuthenticated, CompanyProfileController.getProfileSettings)

companyProfileRouter.route('/settings/update')
  .put(isAuthenticated, CompanyProfileController.updateProfileSettigns)

companyProfileRouter.route('/:client_id')
  .get(isAuthenticated, CompanyProfileController.getCompanyDetails)

companyProfileRouter.route('/:client_id/ratings')
  .get(isAuthenticated, CompanyProfileController.getCompanyRatings)

companyProfileRouter.route('/:client_id/reviews')
  .post(isAuthenticated, CompanyProfileController.postCompanyReview)

companyProfileRouter.route('/:client_id/reviews')
  .get(isAuthenticated, CompanyProfileController.getCompanyReviews)

export { companyProfileRouter }
