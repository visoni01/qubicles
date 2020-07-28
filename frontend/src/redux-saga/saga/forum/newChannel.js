import { takeEvery, put } from 'redux-saga/effects'
import {
  addNewChannelStart,
  addNewChannelSuccessful,
  addNewChannelFailure,
} from '../../redux/actions'

import Forum from '../../service/forum'
import { showErrorMessage } from '../../redux/snackbar'

function* addNewChannelWatcher() {
  yield takeEvery(addNewChannelStart.type, addNewChannelWorker)
}

function* addNewChannelWorker(action) {
  try {
    const {
      title, isPublic, isCompanyAnn, id,
    } = action.payload
    const { data } = yield Forum.addNewChannel({
      title,
      is_public: isPublic,
      is_company_ann: isCompanyAnn,
      category_id: id,
    })
    // eslint-disable-next-line
    const { channel_title, channel_id } = data
    yield put(addNewChannelSuccessful({
      newChannel: {
        title: channel_title,
        id: channel_id,
        noOfTopics: 0,
        description: '',
      },
      categoryId: id,
    }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(addNewChannelFailure())
  }
}

export default addNewChannelWatcher
