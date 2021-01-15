import { takeLatest, put } from 'redux-saga/effects'
import { updateGroupsList } from '../../../redux/actions'
import { ADD_GROUP, UPDATE_GROUP, DELETE_GROUP } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import { getSubstrForNotification } from '../../../../utils/common'

function* groupCrudWatcher() {
  yield takeLatest([ ADD_GROUP, DELETE_GROUP, UPDATE_GROUP ], groupCrudWorker)
}

function* groupCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_GROUP: {
        const {
          title,
        } = action.payload

        const { data } = yield Forum.addGroup(action.payload)
        // eslint-disable-next-line
        yield put(updateGroupsList({
          type: ADD_GROUP,
          data: {
            newGroup: data.newGroup,
          },
        }))
        msg = `Group '${ getSubstrForNotification(title) }' has been successfully created!`
        break
      }

      case UPDATE_GROUP: {
        const {
          groupId,
          groupData,
        } = action.payload

        yield Forum.updateGroup(action.payload)
        // eslint-disable-next-line
        yield put(updateGroupsList({
          type: UPDATE_GROUP,
          data: {
            groupId,
            updatedGroup: groupData,
          },
        }))
        msg = 'Group has been Updated!'
        break
      }

      case DELETE_GROUP: {
        const {
          groupId,
        } = action.payload

        yield Forum.deleteGroup(action.payload)
        // eslint-disable-next-line
        yield put(updateGroupsList({
          type: DELETE_GROUP,
          data: {
            groupId,
          },
        }))
        msg = 'Group Deleted!'
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
