import express from 'express'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'
import talentController from '../../../app/controllers/talent.controller'
import applicationController from '../../../app/controllers/application.controller'
import trainingController from '../../../app/controllers/training.controller'
import multer from 'multer'
const multerUpload = multer()

const args = { mergeParams: true }
const peopleRouter = express.Router(args)

peopleRouter.route('/talent/cards')
  .get(isAuthenticated, talentController.getTalentCards)

peopleRouter.route('/top-talent')
  .get(isAuthenticated, talentController.getTopTalent)

peopleRouter.route('/skills/:candidate_id')
  .get(isAuthenticated, talentController.getUserSkills)

peopleRouter.route('/skills/:candidate_id')
  .put(isAuthenticated, talentController.updateUserSkills)

peopleRouter.route('/skills')
  .get(isAuthenticated, talentController.getJobSkills)

peopleRouter.route('/agent/resume/:candidate_id')
  .get(isAuthenticated, talentController.getAgentResume)

peopleRouter.route('/agent/resume/courses/:candidate_id')
  .get(isAuthenticated, talentController.getUserCourses)

peopleRouter.route('/applications')
  .post(isAuthenticated, applicationController.createJobApplication)

peopleRouter.route('/applications')
  .get(isAuthenticated, applicationController.fetchJobApplication)

peopleRouter.route('/applications/:application_id')
  .put(isAuthenticated, applicationController.updateJobApplication)

peopleRouter.route('/applications/job/:job_id')
  .get(isAuthenticated, applicationController.fetchAllJobApplicationsByJobId)

peopleRouter.route('/applications/user/:agent_user_id')
  .get(isAuthenticated, applicationController.fetchAllJobApplicationsByAgent)

peopleRouter.route('/course').post(multerUpload.fields([
  { name: 'imageFile', maxCount: 1 },
  { name: 'introFile', maxCount: 1 }
]), isAuthenticated, trainingController.createCourse)

peopleRouter.route('/course').put(multerUpload.fields([
  { name: 'imageFile', maxCount: 1 },
  { name: 'introFile', maxCount: 1 }
]), isAuthenticated, trainingController.updateCourse)

peopleRouter.route('/course/file/:file_type')
  .post(multerUpload.single('file'), isAuthenticated, trainingController.uploadFileToIpfs)

peopleRouter.route('/course')
  .get(isAuthenticated, trainingController.getAllCreatorCourses)

peopleRouter.route('/course/:course_id')
  .get(isAuthenticated, trainingController.getCourse)

peopleRouter.route('/course/:course_id')
  .delete(isAuthenticated, trainingController.deleteCourse)

peopleRouter.route('/courses')
  .get(isAuthenticated, trainingController.getAllViewCourses)

peopleRouter.route('/course/:course_id/view')
  .get(isAuthenticated, trainingController.getViewCourse)

peopleRouter.route('/course/:course_id/start')
  .get(isAuthenticated, trainingController.startCourse)

peopleRouter.route('/course/:course_id/buy')
  .get(isAuthenticated, trainingController.buyCourse)

peopleRouter.route('/course/:course_id/unit')
  .put(isAuthenticated, trainingController.getUnit)

peopleRouter.route('/course/:course_id/test')
  .get(isAuthenticated, trainingController.getTest)

peopleRouter.route('/course/:course_id/test')
  .post(isAuthenticated, trainingController.addTestEntries)

peopleRouter.route('/course/:course_id/assessment-test')
  .get(isAuthenticated, trainingController.getAssessmentTest)

peopleRouter.route('/course/:course_id/assessment-test')
  .post(isAuthenticated, trainingController.addAssessmentTestEntries)

peopleRouter.route('/course/:course_id/test-entries')
  .get(isAuthenticated, trainingController.getAllTestEntries)

peopleRouter.route('/course/:course_id/test-entries/:candidate_id')
  .get(isAuthenticated, trainingController.getTestEntry)

peopleRouter.route('/course/:course_id/test-entries/:candidate_id')
  .put(isAuthenticated, trainingController.updateTestEntry)

peopleRouter.route('/course/:course_id/rating')
  .get(isAuthenticated, trainingController.getCourseRating)

peopleRouter.route('/course/:course_id/reviews')
  .get(isAuthenticated, trainingController.getCourseReviews)

peopleRouter.route('/course/:course_id/reviews')
  .post(isAuthenticated, trainingController.addCourseReview)

peopleRouter.route('/course/:course_id/test-result')
  .get(isAuthenticated, trainingController.getTestResult)

peopleRouter.route('/courses/company-courses')
  .get(isAuthenticated, trainingController.getCompanyCourses)

peopleRouter.route('/enrolled-courses')
  .get(isAuthenticated, trainingController.getAllEnrolledCourses)

peopleRouter.route('/required-courses')
  .get(isAuthenticated, trainingController.getAllCourses)

export { peopleRouter }
