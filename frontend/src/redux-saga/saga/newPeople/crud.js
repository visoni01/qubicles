import { takeLatest, put } from 'redux-saga/effects'
import { updateJobsData, newJobDetailsFetchSuccessful } from '../../redux/actions'
import { ADD_JOB, UPDATE_JOB } from '../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobCrudWatcher() {
  yield takeLatest([ ADD_JOB, UPDATE_JOB ], jobCrudWorker)
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
        debugger
        // eslint-disable-next-line
        const { category_id, job_id, user_id, title, description } = data
        yield put(updateJobsData({
          type: ADD_JOB,
          newJob: {
            categoryId: category_id,
            jobId: job_id,
            title,
            description,
            ownerId: user_id,
            noOfApplications: 0,
            notifications: 0,
            evaluating: 4,
            fulfilled: null,
          },
        }))
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
          // requiredCourses,
          // requiredSkills,
          // bonusCourses,
          // bonusSkills,
          payAmount,
          durationMonths,
          ...rest
        } = action.payload
        const { data } = yield People.updateJob({
          jobId,
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
        // eslint-disable-next-line
        const { category_id, job_id, user_id, title, description } = data
        yield put(updateJobsData({
          type: UPDATE_JOB,
          updatedJob: {
            categoryId: category_id,
            jobId: job_id,
            title,
            description,
            ownerId: user_id,
            noOfApplications: 0,
            notifications: 0,
            evaluating: 4,
            fulfilled: null,
          },
        }))
        yield put(newJobDetailsFetchSuccessful(action.payload))
        msg = 'Job has been successfully updated!'
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobCrudWatcher
