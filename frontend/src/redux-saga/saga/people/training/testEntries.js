import { takeEvery, put } from 'redux-saga/effects'
import {
  testEntriesRequestStart,
  testEntriesRequestSuccess,
  testEntriesRequestFailed,
  showErrorMessage,
  showSuccessMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* testEntriesWatcher() {
  yield takeEvery(testEntriesRequestStart.type, testEntriesWorker)
}

function* testEntriesWorker(action) {
  try {
    const {
      requestType, dataType, courseId, testType, candidateId, validatedData,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'All Test Entries': {
            const { data } = yield People.fetchAllTestEntries({ courseId })
            yield put(testEntriesRequestSuccess({ testEntriesData: data }))
            break
          }

          case 'Test Entry Answers': {
            const { data } = yield People.fetchTestEntryAnswers({ courseId, candidateId, testType })
            yield put(testEntriesRequestSuccess({ sections: data, candidateId, testType }))
            break
          }

          default: break
        }
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          case 'Validate Answers': {
            const { data } = yield People.validateTestEntryAnswers({
              courseId, candidateId, validatedData,
            })
            yield put(testEntriesRequestSuccess({
              testEntryAnswers: data, candidateId, validatedData,
            }))
            yield put(showSuccessMessage({ msg: 'Answers validated successfully' }))
            break
          }

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
