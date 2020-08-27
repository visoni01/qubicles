import Responder from '../../server/expressResponder'
import config from '../../config/app'
import { PostSignupEmployerStep1Service, PostSignupEmployerStep2Service, PostSignupEmployerStep3Service, PostSignupEmployerStep4Service } from '../services/user/employer/postSignupEmployer'

export default class UserEmployerController {
  static async postSignupEmployer (req, res) {
    let postSignupEmployerResult
    let postSignupEmployerStep3Result
    switch (req.params.step) {
      case 'step1':
        postSignupEmployerResult = await PostSignupEmployerStep1Service.execute(req.body)
        break
      case 'step2':
        postSignupEmployerResult = await PostSignupEmployerStep2Service.execute(req.body)
        break
      case 'step3':
        postSignupEmployerStep3Result = await PostSignupEmployerStep3Service.execute(req.body)
        break
      case 'step4':
        postSignupEmployerResult = await PostSignupEmployerStep4Service.execute(req.body)
        break
    }
    if (postSignupEmployerResult.successful) {
      Responder.success(res, postSignupEmployerResult.result)
    }
    if (postSignupEmployerStep3Result.successful) {
      res.cookie('is_post_signup_completed', 1, {
        maxAge: config.get('cookieMaxAge')
      })
      Responder.success(res, postSignupEmployerStep3Result.result)
    } else {
      Responder.failed(res, postSignupEmployerResult.errors)
    }
  }
}
