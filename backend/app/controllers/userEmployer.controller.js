import Responder from '../../server/expressResponder'
import PostUsersEmployerStep1 from '../services/user/employer/postSignupEmployerStep1'
import PostUsersEmployerStep2 from '../services/user/employer/postSignupEmployerStep2'
import PostUsersEmployerStep3 from '../services/user/employer/postSignupEmployerStep3'
import PostUsersEmployerStep4 from '../services/user/employer/postSignupEmployerStep4'

export default class UserEmployerController {
  static async postSignupEmployer (req, res) {
    let postSignupEmployerResult
    switch (req.params.step) {
      case 'step1':
        postSignupEmployerResult = await PostUsersEmployerStep1.execute(req.body)
        break
      case 'step2':
        postSignupEmployerResult = await PostUsersEmployerStep2.execute(req.body)
        break
      case 'step3':
        postSignupEmployerResult = await PostUsersEmployerStep3.execute(req.body)
        break
      case 'step4':
        postSignupEmployerResult = await PostUsersEmployerStep4.execute(req.body)
        break
    }
    if (postSignupEmployerResult.successful) {
      Responder.success(res, postSignupEmployerResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', postSignupEmployerResult.errors)
    }
  }
}
