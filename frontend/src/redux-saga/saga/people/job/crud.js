import { takeLatest, put } from 'redux-saga/effects'
import {
  updateJobsData, jobDetailsFetchSuccessful, jobPublishSuccessful, jobPublishFailure,
} from '../../../redux/actions'
import { ADD_JOB, UPDATE_JOB, DELETE_JOB } from '../../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../../redux/utils/snackbar'
import People from '../../../service/people'

function* jobCrudWatcher() {
  yield takeLatest([ ADD_JOB, UPDATE_JOB, DELETE_JOB ], jobCrudWorker)
}

function* jobCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_JOB: {
        const {
          categoryId,
          jobType,
          employmentType,
          experienceType,
          durationType,
          jobCoursesData,
          jobSkillsData,
          payAmount,
          durationMonths,
          ...rest
        } = action.payload
        const { data } = yield People.addJob({
          job_type: jobType,
          employment_type: employmentType,
          duration_type: durationType,
          duration_months: durationMonths,
          category_id: categoryId,
          experience_type: experienceType,
          required_courses: jobCoursesData.requiredCourses,
          required_skills: jobSkillsData.requiredSkills,
          bonus_courses: jobCoursesData.bonusCourses,
          bonus_skills: jobSkillsData.bonusSkills,
          pay_amount: payAmount,
          ...rest,
        })
        yield put(updateJobsData({
          type: ADD_JOB,
          newJob: data,
        }))
        yield put(jobPublishSuccessful({ publishedJobId: data.job_id }))
        msg = 'Job has been successfully created!'
        break
      }
      case UPDATE_JOB: {
        const {
          categoryId,
          jobId,
          jobType,
          employmentType,
          experienceType,
          durationType,
          jobCoursesData,
          jobSkillsData,
          payAmount,
          durationMonths,
          title,
          description,
          needed,
          jobPostOwnerId,
          ...rest
        } = action.payload
        yield People.updateJob({
          jobId,
          title,
          description,
          needed,
          jobPostOwnerId,
          job_type: jobType,
          employment_type: employmentType,
          duration_type: durationType,
          duration_months: durationMonths,
          category_id: categoryId,
          experience_type: experienceType,
          required_courses: jobCoursesData.requiredCourses,
          required_skills: jobSkillsData.requiredSkills,
          bonus_courses: jobCoursesData.bonusCourses,
          bonus_skills: jobSkillsData.bonusSkills,
          pay_amount: payAmount,
          ...rest,
        })
        yield put(updateJobsData({
          type: UPDATE_JOB,
          updatedJob: {
            categoryId,
            jobId,
            title,
            description,
            jobPostOwnerId,
            noOfApplications: 0,
            notifications: 0,
            evaluating: 4,
            fulfilled: null,
            needed,
          },
        }))
        yield put(jobDetailsFetchSuccessful(action.payload))
        yield put(jobPublishSuccessful({ publishedJobId: jobId }))
        msg = 'Job has been successfully updated!'
        break
      }
      case DELETE_JOB: {
        const { jobId, categoryId } = action.payload
        yield People.deleteJob({ jobId })
        yield put(updateJobsData({
          type: DELETE_JOB,
          deletedJobId: {
            jobId,
            categoryId,
          },
        }))
        msg = 'Job has been succesfully deleted!'
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(jobPublishFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobCrudWatcher
