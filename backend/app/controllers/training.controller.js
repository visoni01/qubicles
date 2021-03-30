import {
  PeopleCreateTrainingCourseService
} from '../services/people/training'
import Responder from '../../server/expressResponder'

export default class TrainingController {
  static async createCourse (req, res) {
    const course = await PeopleCreateTrainingCourseService.execute({ ...req.query, ...req.body })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }
}
