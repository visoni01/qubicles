import { takeEvery, put } from 'redux-saga/effects'
import {
  categoryDeletionStart,
  categoryDeletionSuccessful,
  categoryDeletionFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'

function* deleteCategoryWatcherStart() {
  yield takeEvery(categoryDeletionStart.type, deleteCategoryActivityWorker)
}

function* deleteCategoryActivityWorker(action) {
  try {
    const { categoryId } = action.payload
    const { data } = yield Forum.deleteCategory({ categoryId })
    yield put(categoryDeletionSuccessful({ deletedCategoryId: data.category_id }))
  } catch (e) {
    yield put(categoryDeletionFailure())
  }
}

export default deleteCategoryWatcherStart
export {
  deleteCategoryActivityWorker,
}
