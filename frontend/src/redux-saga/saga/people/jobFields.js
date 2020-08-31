import { takeLatest, put } from 'redux-saga/effects'
import { updateJobsFields } from '../../redux/actions'
import { JOB_FIELDS } from '../../redux/constants'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobFieldsWatcher() {
  yield takeLatest([ JOB_FIELDS ], jobFieldsWorker)
}

function* jobFieldsWorker(action) {
  try {
    const { data } = yield People.getJobCategoriesAndTitles()
    yield put(updateJobsFields({ jobFields: data }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default jobFieldsWatcher
