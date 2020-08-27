import Responder from '../../server/expressResponder'
import config from '../../config/app'
import {
  PostSignupAgentStep1Service,
  PostSignupAgentStep2Service,
  PostSignupAgentStep3Service,
  PostSignupAgentStep4Service,
  PostSignupAgentStep5Service,
  PostSignupAgentStep6Service
} from '../services/user/agent/postSignupAgent'
import { getTokenAfterPostSignupCompleted } from '../services/helper'

export default class UserAgentController {
  static async postSignupAgent (req, res) {
    let postSignupAgentResult
    let postSignupAgentStep5Result
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
        postSignupAgentStep5Result = await PostSignupAgentStep5Service.execute(req.body)
        break
      case 'step6':
        postSignupAgentResult = await PostSignupAgentStep6Service.execute(req.body)
        break
    }

    if (postSignupAgentResult.successful) {
      if (req.params.step === 'step5') {
        const token = await getTokenAfterPostSignupCompleted(req.user)
        res.cookie('access_token', token, {
          maxAge: config.get('cookieMaxAge')
        })
      }
      Responder.success(res, postSignupAgentResult.result)
    }
    if (postSignupAgentStep5Result.successful) {
      res.cookie('is_post_signup_completed', 1, {
        maxAge: config.get('cookieMaxAge')
      })
      Responder.success(res, postSignupAgentStep5Result.result)
    } else {
      Responder.failed(res, postSignupAgentResult.errors)
    }
  }
}
