import {
  PeopleAddNewCourseService,
  PeopleGetAllCreatorCoursesService,
  PeopleGetCourseService,
  PeopleDeleteCourseService,
  PeopleUpdateCourseService,
  PeopleUploadFileToIpfsService,
  PeopleGetAllViewCoursesService,
  PeopleGetViewCourseService,
  PeopleStartCourseService,
  PeopleBuyCourseService,
  PeopleGetUnitService,
  PeopleGetTestService,
  PeopleAddTestEntriesService,
  PeopleGetAssessmentTestService,
  PeopleAddAssessmentTestEntriesService,
  PeopleGetAllTestEntriesService,
  PeopleGetTestEntryService,
  PeopleUpdateTestEntryService,
  PeopleGetAllEnrolledCoursesService,
  PeopleGetCourseRatingService,
  PeopleGetCourseReviewsService,
  PeopleAddCourseReviewService,
  PeopleGetAllCoursesService,
  PeopleGetCompanyCoursesService,
  PeopleGetTestResultService
} from '../services/people/training'

import Responder from '../../server/expressResponder'

export default class TrainingController {
  static async createCourse (req, res) {
    const course = await PeopleAddNewCourseService.execute({
      ...req.body,
      imageFile: req.files.imageFile && req.files.imageFile[0],
      introFile: req.files.introFile && req.files.introFile[0]
    })
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

  static async deleteCourse (req, res) {
    const course = await PeopleDeleteCourseService.execute({ ...req.body, ...req.params })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }

  static async updateCourse (req, res) {
    const course = await PeopleUpdateCourseService.execute({
      ...req.body,
      imageFile: req.files.imageFile && req.files.imageFile[0],
      introFile: req.files.introFile && req.files.introFile[0]
    })
    if (course.successful) {
      Responder.success(res, course.result)
    } else {
      Responder.failed(res, course.errors)
    }
  }

  static async uploadFileToIpfs (req, res) {
    const file = await PeopleUploadFileToIpfsService.execute({ ...req.body, ...req.params, file: req.file })
    if (file.successful) {
      Responder.success(res, file.result)
    } else {
      Responder.failed(res, file.errors)
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

  static async startCourse (req, res) {
    const course = await PeopleStartCourseService.execute({ ...req.body, ...req.params })
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

  static async getUnit (req, res) {
    const unit = await PeopleGetUnitService.execute({ ...req.body, ...req.params, ...req.query })
    if (unit.successful) {
      Responder.success(res, unit.result)
    } else {
      Responder.failed(res, unit.errors)
    }
  }

  static async getTest (req, res) {
    const test = await PeopleGetTestService.execute({ ...req.body, ...req.params, ...req.query })
    if (test.successful) {
      Responder.success(res, test.result)
    } else {
      Responder.failed(res, test.errors)
    }
  }

  static async addTestEntries (req, res) {
    const test = await PeopleAddTestEntriesService.execute({ ...req.body, ...req.params, ...req.query })
    if (test.successful) {
      Responder.success(res, test.result)
    } else {
      Responder.failed(res, test.errors)
    }
  }

  static async getAssessmentTest (req, res) {
    const test = await PeopleGetAssessmentTestService.execute({ ...req.body, ...req.params })
    if (test.successful) {
      Responder.success(res, test.result)
    } else {
      Responder.failed(res, test.errors)
    }
  }

  static async addAssessmentTestEntries (req, res) {
    const test = await PeopleAddAssessmentTestEntriesService.execute({ ...req.body, ...req.params })
    if (test.successful) {
      Responder.success(res, test.result)
    } else {
      Responder.failed(res, test.errors)
    }
  }

  static async getAllTestEntries (req, res) {
    const test = await PeopleGetAllTestEntriesService.execute({ ...req.body, ...req.params })
    if (test.successful) {
      Responder.success(res, test.result)
    } else {
      Responder.failed(res, test.errors)
    }
  }

  static async getTestEntry (req, res) {
    const testEntry = await PeopleGetTestEntryService.execute({ ...req.body, ...req.params, ...req.query })
    if (testEntry.successful) {
      Responder.success(res, testEntry.result)
    } else {
      Responder.failed(res, testEntry.errors)
    }
  }

  static async updateTestEntry (req, res) {
    const testEntry = await PeopleUpdateTestEntryService.execute({ ...req.body, ...req.params })
    if (testEntry.successful) {
      Responder.success(res, testEntry.result)
    } else {
      Responder.failed(res, testEntry.errors)
    }
  }

  static async getAllEnrolledCourses (req, res) {
    const courses = await PeopleGetAllEnrolledCoursesService.execute({ ...req.body })
    if (courses.successful) {
      Responder.success(res, courses.result)
    } else {
      Responder.failed(res, courses.errors)
    }
  }

  static async getCourseRating (req, res) {
    const rating = await PeopleGetCourseRatingService.execute({ ...req.body, ...req.params })
    if (rating.successful) {
      Responder.success(res, rating.result)
    } else {
      Responder.failed(res, rating.errors)
    }
  }

  static async getCourseReviews (req, res) {
    const reviews = await PeopleGetCourseReviewsService.execute({ ...req.body, ...req.params, ...req.query })
    if (reviews.successful) {
      Responder.success(res, reviews.result)
    } else {
      Responder.failed(res, reviews.errors)
    }
  }

  static async addCourseReview (req, res) {
    const reviews = await PeopleAddCourseReviewService.execute({ ...req.body, ...req.params, ...req.query })
    if (reviews.successful) {
      Responder.success(res, reviews.result)
    } else {
      Responder.failed(res, reviews.errors)
    }
  }

  static async getAllCourses (req, res) {
    const courses = await PeopleGetAllCoursesService.execute({ ...req.body, ...req.query })
    if (courses.successful) {
      Responder.success(res, courses.result)
    } else {
      Responder.failed(res, courses.errors)
    }
  }

  static async getCompanyCourses (req, res) {
    const courses = await PeopleGetCompanyCoursesService.execute({ ...req.body, ...req.query })
    if (courses.successful) {
      Responder.success(res, courses.result)
    } else {
      Responder.failed(res, courses.errors)
    }
  }

  static async getTestResult (req, res) {
    const test = await PeopleGetTestResultService.execute({ ...req.body, ...req.params, ...req.query })
    if (test.successful) {
      Responder.success(res, test.result)
    } else {
      Responder.failed(res, test.errors)
    }
  }
}
