import Responder from '../../server/expressResponder'
import { PostSignupEmployerStep1Service, PostSignupEmployerStep2Service, PostSignupEmployerStep3Service, PostSignupEmployerStep4Service } from '../services/user/employer/postSignupEmployer'

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
      Responder.success(res, postSignupEmployerResult.result)
    } else {
      Responder.failed(res, postSignupEmployerResult.errors)
    }
  }
}
