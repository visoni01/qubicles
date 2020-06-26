import Responder from '../../server/expressResponder'
import {
  PostSignupAgentStep1Service,
  PostSignupAgentStep2Service,
  PostSignupAgentStep3Service,
  PostSignupAgentStep4Service,
  PostSignupAgentStep5Service,
  PostSignupAgentStep6Service
} from '../services/user/agent/postSignupAgent'

export default class UserAgentController {
  static async postSignupAgent (req, res) {
    let postSignupAgentResult
    switch (req.params.step) {
      case 'step1':
        postSignupAgentResult = await PostSignupAgentStep1Service.execute(req.body)
        break
      case 'step2':
        postSignupAgentResult = await PostSignupAgentStep2Service.execute(req.body)
        break
      case 'step3':
        postSignupAgentResult = await PostSignupAgentStep3Service.execute(req.body)
        break
      case 'step4':
        postSignupAgentResult = await PostSignupAgentStep4Service.execute(req.body)
        break
      case 'step5':
        await PostSignupAgentStep5Service.execute(req.body)
        postSignupAgentResult = await PostSignupAgentStep6Service.execute(req.body)
        break
    }
    if (postSignupAgentResult.successful) {
      Responder.success(res, postSignupAgentResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', postSignupAgentResult.errors)
    }
  }
}
