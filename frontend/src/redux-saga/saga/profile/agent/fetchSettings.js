import { put, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'
import {
  agentProfileSettingsApiStart,
  agentProfileSettingsApiSuccess,
  agentProfileSettingsApiFailure,
  showErrorMessage,
  showSuccessMessage,
} from '../../../redux/actions'
import AgentProfile from '../../../service/profile/agent'

function* agentProfileWatcher() {
  yield takeEvery(agentProfileSettingsApiStart.type, agentProfileWorker)
}

function* agentProfileWorker(action) {
  try {
    const { updatedDataType, updatedData, requestType } = action.payload
    switch (requestType) {
      case 'FETCH': {
        const { data } = yield AgentProfile.fetchAgentProfileSettings()
        yield put(agentProfileSettingsApiSuccess({ agentDetails: data }))
        break
      }
      case 'UPDATE': {
        yield AgentProfile.updateAgentProfileSettings({ updatedDataType, updatedData })
        yield put(agentProfileSettingsApiSuccess({ updatedDataType, updatedData }))
        switch (updatedDataType) {
          case 'email': {
            yield put(showSuccessMessage({ msg: 'Email Verification mail sent successfully' }))
            break
          }
          default: {
            yield put(showSuccessMessage({ msg: _.capitalize(`${ updatedDataType } changed successfully`) }))
          }
        }
        break
      }
      default: break
    }
  } catch (e) {
    yield put(agentProfileSettingsApiFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentProfileWatcher
