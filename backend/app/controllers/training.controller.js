import {
  PeopleAddNewCourseService,
  PeopleGetAllCreatorCoursesService,
  PeopleGetCourseService,
  PeopleUpdateCourseService,
  PeopleGetAllViewCoursesService,
  PeopleGetViewCourseService,
  PeopleBuyCourseService
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

  static async getAllCreatorCourses (req, res) {
    const courses = await PeopleGetAllCreatorCoursesService.execute({ ...req.body, ...req.query })
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

  static async updateCourse (req, res) {
    const course = await PeopleUpdateCourseService.execute({ ...req.body, file: req.file })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }

  static async getAllViewCourses (req, res) {
    const course = await PeopleGetAllViewCoursesService.execute({ ...req.body, ...req.query })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }

  static async getViewCourse (req, res) {
    const course = await PeopleGetViewCourseService.execute({ ...req.body, ...req.params, ...req.query })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }

  static async buyCourse (req, res) {
    const course = await PeopleBuyCourseService.execute({ ...req.body, ...req.params, ...req.query })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }
}
