import { takeEvery, put } from 'redux-saga/effects'
import {
  testEntriesRequestStart,
  testEntriesRequestSuccess,
  testEntriesRequestFailed,
  showErrorMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* testEntriesWatcher() {
  yield takeEvery(testEntriesRequestStart.type, testEntriesWorker)
}

function* testEntriesWorker(action) {
  try {
    const {
      requestType, dataType, courseId,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'Test Entries': {
            const { data } = yield People.fetchTestEntries({ courseId })
            yield put(testEntriesRequestSuccess({ testEntriesData: data }))
            break
          }

          default: break
        }
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(testEntriesRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default testEntriesWatcher
