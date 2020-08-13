import { takeLatest, put, select } from 'redux-saga/effects'
import { updateCategoryData } from '../../../redux/actions'
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import { getSubstrForNotification } from '../../../../utils/common'

function* categoryCrudWatcher() {
  yield takeLatest([ ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY ], categoryCrudWorker)
}

function* categoryCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_CATEGORY: {
        const { isPublic, title } = action.payload
        const { userDetails } = yield select((state) => state.login)
        const { data } = yield Forum.addNewCategory({
          title,
          is_public: isPublic,
        })
        yield put(updateCategoryData({
          type: ADD_CATEGORY,
          newCategory: { ...data, owner: userDetails.user_id },
        }))
        msg = `Group '${ getSubstrForNotification(title) }' has been successfully created!`
        break
      }
      case DELETE_CATEGORY: {
        const { categoryId, title } = action.payload
        const { data } = yield Forum.deleteCategory({ categoryId })
        yield put(updateCategoryData({ type: DELETE_CATEGORY, categoryId: data.category_id }))
        msg = `Group '${ getSubstrForNotification(title) }' has been successfully deleted!`
        break
      }
      case UPDATE_CATEGORY: {
        const { payload } = action
        const { data } = yield Forum.updateCategory(payload)
        yield put(updateCategoryData({ type: UPDATE_CATEGORY, data }))
        msg = `Group '${ getSubstrForNotification(data.title) }' has been successfully updated!`
        break
      }
      default:
        break
    }
    if (msg) {
      yield put(showSuccessMessage({ msg }))
    }
  } catch (e) {
    yield put(showErrorMessage())
  }
}

export default categoryCrudWatcher
