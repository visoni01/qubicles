import { takeLatest, put } from 'redux-saga/effects'
import { updateCategoryData } from '../../../redux/actions'
import { ADD_CHANNEL } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'

function* channelCrudWatcher() {
  yield takeLatest([ ADD_CHANNEL ], categoryCrudWorker)
}

function* categoryCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_CHANNEL: {
        const {
          title, isPublic, isCompanyAnn, id, userId,
        } = action.payload
        const { data } = yield Forum.addNewChannel({
          title,
          is_public: isPublic,
          is_company_ann: isCompanyAnn,
          category_id: id,
        })

        // eslint-disable-next-line
        yield put(updateCategoryData({
          type: ADD_CHANNEL,
          data: {
            newChannel: {
              title: data.channel_title,
              id: data.channel_id,
              noOfTopics: 0,
              description: '',
            },
            categoryId: id,
          },
        }))
        msg = `Channel '${ title }' has been successfully created!`
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage())
  }
}

export default channelCrudWatcher
