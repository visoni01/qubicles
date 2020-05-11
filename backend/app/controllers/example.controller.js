import Responder from '../../server/expressResponder'
import ExampleMethod from '../services/example/exampleMethod'

export default class ExampleController {
  static async exampleMethod (req, res) {
    const exampleResult = await ExampleMethod.execute(req.body)
    if (exampleResult.successful) {
      Responder.success(res, exampleResult.result)
    } else {
      res.boom.badRequest('Validation didn\'t succeed', exampleResult.errors)
    }
  }
}
