import Responder from '../../server/expressResponder'
import postSignupAgentStep1 from '../services/user/agent/postSignupAgentStep1'
import postSignupAgentStep2 from '../services/user/agent/postSignupAgentStep2'
import postSignupAgentStep3 from '../services/user/agent/postSignupAgentStep3'
import postSignupAgentStep4 from '../services/user/agent/postSignupAgentStep4'
import postSignupAgentStep5 from '../services/user/agent/postSignupAgentStep5'

export default class UserAgentController {
  static async postSignupAgent (req, res) {
    let postSignupAgentResult
    switch (req.params.step) {
      case 'step1':
        postSignupAgentResult = await postSignupAgentStep1.execute(req.body)
        break
      case 'step2':
        postSignupAgentResult = await postSignupAgentStep2.execute(req.body)
        break
      case 'step3':
        postSignupAgentResult = await postSignupAgentStep3.execute(req.body)
        break
      case 'step4':
        postSignupAgentResult = await postSignupAgentStep4.execute(req.body)
        break
      case 'step5':
        postSignupAgentResult = await postSignupAgentStep5.execute(req.body)
        break
    }
    if (postSignupAgentResult.successful) {
      Responder.success(res, postSignupAgentResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', postSignupAgentResult.errors)
    }
  }
}
