import Responder from '../../server/expressResponder'
import ForumCategories from '../services/forum/categories'

export default class ForumController {
  static async getCategories (req, res) {
    const forumCategories = await ForumCategories.execute(req.body)
    if (forumCategories.successful) {
      Responder.success(res, forumCategories.result)
    } else {
      res.boom.badRequest('Error in forumCategories Service', forumCategories.errors)
    }
  }
}
