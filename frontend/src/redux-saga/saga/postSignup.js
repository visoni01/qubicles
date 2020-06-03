import { takeEvery, put } from 'redux-saga/effects'
import apiClient from '../../utils/apiClient'
import {
  postSignUpStepStart,
  postSignUpStepSuccessful,
  postSignUpStepFailure,
} from '../redux/postSignup'

function* postSignupStepWatcher() {
  yield takeEvery( postSignUpStepStart.type, postSignupStepWorker )
}

function* postSignupStepWorker( action ) {
  try {
    const { type, step, data } = action.payload
    // yield apiClient.postSignUp( type, step, data ) Will uncomment when BE will ready.
    yield put( postSignUpStepSuccessful( { step, data } ) )
  } catch ( e ) {
    yield put( postSignUpStepFailure() )
  }
}

export default postSignupStepWatcher
