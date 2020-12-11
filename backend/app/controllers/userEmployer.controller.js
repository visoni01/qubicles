import Responder from '../../server/expressResponder'
import config from '../../config/app'
import {
  PostSignupEmployerStep1Service,
  PostSignupEmployerStep2Service,
  PostSignupEmployerStep3Service,
  PostSignupEmployerStep4Service
} from '../services/user/employer/postSignupEmployer'
import { getTokenAfterPostSignupCompleted } from '../services/helper'
import { EditCompanyTitleSummaryService } from '../services/user'

export default class UserEmployerController {
  static async postSignupEmployer (req, res) {
    let postSignupEmployerResult
    switch (req.params.step) {
      case 'step1':
        postSignupEmployerResult = await PostSignupEmployerStep1Service.execute(req.body)
        break
      case 'step2':
        postSignupEmployerResult = await PostSignupEmployerStep2Service.execute(req.body)
        break
      case 'step3':
        await PostSignupEmployerStep3Service.execute(req.body)
        postSignupEmployerResult = await PostSignupEmployerStep4Service.execute(req.body)
        break
    }

    if (postSignupEmployerResult.successful) {
      if (req.params.step === 'step3') {
        const token = await getTokenAfterPostSignupCompleted(req.user)
        res.cookie('access_token', token, {
          maxAge: config.get('cookieMaxAge')
        })
      }

      Responder.success(res, postSignupEmployerResult.result)
    } else {
      Responder.failed(res, postSignupEmployerResult.errors)
    }
  }

  static async editCompanyTitleSummary (req, res) {
    const editCompanyTitleSummaryResult = await EditCompanyTitleSummaryService.execute({ ...req.body })
    if (editCompanyTitleSummaryResult.successful) {
      Responder.success(res, editCompanyTitleSummaryResult.result)
    } else {
      Responder.failed(res, editCompanyTitleSummaryResult.errors)
    }
  }
}
