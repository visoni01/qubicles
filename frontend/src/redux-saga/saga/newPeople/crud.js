import { takeLatest, put } from 'redux-saga/effects'
import { updateJobsData, newJobDetailsFetchSuccessful } from '../../redux/actions'
import { ADD_JOB } from '../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobCrudWatcher() {
  yield takeLatest([ ADD_JOB ], jobCrudWorker)
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
          requiredCourses,
          requiredSkills,
          bonusCourses,
          bonusSkills,
          payAmount,
          ...rest
        } = action.payload
        const { data } = yield People.addNewJob({
          job_type: jobType,
          employment_type: employmentType,
          duration_type: durationType,
          category_id: categoryId,
          experience_type: experienceType,
          required_courses: requiredCourses,
          required_skills: requiredSkills,
          bonus_courses: bonusCourses,
          bonus_skills: bonusSkills,
          pay_amount: payAmount,
          ...rest,
        })
        // eslint-disable-next-line
        // const { category_id, job_id, user_id, title, description } = data
        // yield put(updateJobsData({
        //   type: ADD_JOB,
        //   newJob: {
        //     categoryId: category_id,
        //     jobId: job_id,
        //     title,
        //     description,
        //     ownerId: user_id,
        //     noOfApplications: 0,
        //     notifications: 0,
        //   },
        // }))
        msg = 'Job has been successfully created!'
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
