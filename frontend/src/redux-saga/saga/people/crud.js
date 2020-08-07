import { takeLatest, put } from 'redux-saga/effects'
import { updateJobsData } from '../../redux/actions'
import { DELETE_JOB } from '../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../redux/snackbar'
import People from '../../service/people'
import { getSubstrForNotification } from '../../../utils/common'

function* jobCrudWatcher() {
  yield takeLatest([ DELETE_JOB ], jobCrudWorker)
}

function* jobCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case DELETE_JOB: {
        const { categoryId, jobId, title } = action.payload
        yield People.deleteJob({ jobId })
        yield put(updateJobsData({ type: DELETE_JOB, jobId, categoryId }))
        msg = `Job ${ getSubstrForNotification(title) } has been successfully deleted!`
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default jobCrudWatcher
