import {
  PeopleAddNewCourseService,
  PeopleGetAllCoursesService,
  PeopleGetCourseService
} from '../services/people/training'

import Responder from '../../server/expressResponder'

export default class TrainingController {
  static async createCourse (req, res) {
    const course = await PeopleAddNewCourseService.execute({ ...req.body, file: req.file })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }

  static async getAllCourses (req, res) {
    const courses = await PeopleGetAllCoursesService.execute({ ...req.body, ...req.params, ...req.query })
    if (courses.successful) {
      Responder.success(res, courses.result)
    } else {
      Responder.failed(res, courses.errors)
    }
  }

  static async getCourse (req, res) {
    const course = await PeopleGetCourseService.execute({ ...req.body, ...req.params, ...req.query })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }
}
