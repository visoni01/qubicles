import { takeLatest, put } from 'redux-saga/effects'
import { updateGroupsList } from '../../../redux/actions'
import { ADD_GROUP } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import { getSubstrForNotification } from '../../../../utils/common'

function* groupCrudWatcher() {
  yield takeLatest([ ADD_GROUP ], groupCrudWorker)
}

function* groupCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_GROUP: {
        const {
          title, description, permission,
        } = action.payload

        const { data } = yield Forum.addGroup(action.payload)
        // eslint-disable-next-line
        yield put(updateGroupsList({
          type: ADD_GROUP,
          data: {
            newGroup: data.newGroup,
          },
        }))
        msg = `Channel '${ getSubstrForNotification(title) }' has been successfully created!`
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

export default groupCrudWatcher
