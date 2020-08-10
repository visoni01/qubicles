import { takeLatest, put } from 'redux-saga/effects'
import { updateCategoryData } from '../../../redux/actions'
import { ADD_CHANNEL, DELETE_CHANNEL } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'

function* channelCrudWatcher() {
  yield takeLatest([ ADD_CHANNEL, DELETE_CHANNEL ], categoryCrudWorker)
}

function* categoryCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_CHANNEL: {
        const {
          title, description, isPublic, isCompanyAnn, id,
        } = action.payload
        const { data } = yield Forum.addNewChannel({
          title,
          channel_description: description,
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
              description,
              noOfTopics: 0,
            },
            categoryId: id,
          },
        }))
        msg = `Channel '${ title }' has been successfully created!`
        break
      }
      case DELETE_CHANNEL: {
        const { channelId, title } = action.payload
        const { data } = yield Forum.deleteChannel({ channelId })
        // eslint-disable-next-line
        yield put(updateCategoryData({
          type: DELETE_CHANNEL,
          data: action.payload,
        }))
        msg = `Channel '${ title }' has been successfully deleted!`
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

export default channelCrudWatcher
