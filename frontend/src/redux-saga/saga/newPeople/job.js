import { takeEvery, put } from 'redux-saga/effects'
import {
  newJobDetailsFetchStart, jobDetailsFetchSuccessful, newUpdateJobsFields, newJobDetailsFetchSuccessful,
} from '../../redux/actions'
import { NEW_JOB_FIELDS } from '../../redux/constants'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobDetailsWatcher() {
  yield takeEvery([ newJobDetailsFetchStart.type, NEW_JOB_FIELDS ], jobDetailsWorker)
}

function* jobDetailsWorker(action) {
  try {
    switch (action.type) {
      case NEW_JOB_FIELDS: {
        const { data } = yield People.getJobCategoriesTitlesAndSkills()
        yield put(newUpdateJobsFields({ jobFields: data }))
        break
      }
      case newJobDetailsFetchStart.type: {
        const { jobId } = action.payload
        const reponse = yield People.getJobById(jobId)
        const { data } = reponse
        console.log('data in job saga =====>>>>>', data)
        if (data) {
          yield put(newJobDetailsFetchSuccessful({
            jobDetails: {
              jobId: data.job_id,
              title: data.title,
              description: data.description,
              categoryId: data.category_id,
              positionId: data.position_id,
              jobType: data.job_type,
              employmentType: data.employment_type,
              durationType: data.duration_type,
              experienceType: data.experience_type,
              locationType: data.location_type,
              payAmount: data.pay_amount,
              city: data.city,
              state: data.state,
              country: data.country,
              needed: data.needed,
              bonusCourses: data.bonus_courses,
              bonusSkills: data.bonus_skills,
              requiredCourses: data.required_courses,
              requiredSkills: data.required_skills,
              createdOn: data.created_on,
            },
          }))
        }
        break
      }
      default: return
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobDetailsWatcher
