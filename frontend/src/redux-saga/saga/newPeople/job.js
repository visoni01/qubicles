import { takeEvery, put } from 'redux-saga/effects'
import {
  newJobDetailsFetchStart, newUpdateJobsFields, newJobDetailsFetchSuccessful,
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
        if (data) {
          yield put(newJobDetailsFetchSuccessful({
            jobDetails: {
              jobId: data.jobDetails.job_id,
              categoryId: data.jobDetails.category_id,
              jobPostOwnerId: data.jobDetails.user_id,
              clientId: data.jobDetails.client_id,
              title: data.jobDetails.title,
              description: data.jobDetails.description,
              jobType: data.jobDetails.job_type,
              employmentType: data.jobDetails.employment_type,
              durationType: data.jobDetails.duration_type,
              durationMonths: data.jobDetails.duration_months,
              experienceType: data.jobDetails.experience_type,
              locationType: data.jobDetails.location_type,
              payAmount: data.jobDetails.pay_amount,
              city: data.jobDetails.city,
              state: data.jobDetails.state,
              country: data.jobDetails.country,
              needed: data.jobDetails.needed,
              fulfilled: data.jobDetails.fulfilled,
              createdOn: data.jobDetails.created_on,
              jobSkillsData: data.jobSkillsData,
              jobCoursesData: data.jobCoursesData,
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
