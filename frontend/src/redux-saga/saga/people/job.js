import { takeEvery, put } from 'redux-saga/effects'
import { jobDetailsFetchStart, jobDetailsFetchSuccessful, updateJobsFields } from '../../redux/actions'
import { JOB_FIELDS } from '../../redux/constants'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobDetailsWatcher() {
  yield takeEvery([ jobDetailsFetchStart.type, JOB_FIELDS ], jobDetailsWorker)
}

function* jobDetailsWorker(action) {
  try {
    switch (action.type) {
      case JOB_FIELDS: {
        const { data } = yield People.getJobCategoriesAndTitles()
        console.log('data in job saga======>>>>', data)
        yield put(updateJobsFields({ jobFields: data }))
        break
      }
      case jobDetailsFetchStart.type: {
        const { jobId } = action.payload
        const reponse = yield People.getJobById(jobId)
        const { data } = reponse
        if (data) {
          yield put(jobDetailsFetchSuccessful({
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
            city: data.city,
            state: data.state,
            country: data.country,
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
