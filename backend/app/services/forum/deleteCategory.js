import ServiceBase from '../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../utils/errors'
import logger from '../../common/logger'
import { deleteCategory, getErrorMessageForService, getCategoryById } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  category_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumDeleteCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, category_id } = this.filteredArgs
      const categoryData = await getCategoryById({ category_id })
      if (categoryData) {
        if (categoryData.owner_id === user_id) {
          await deleteCategory({ category_id: categoryData.category_id })
          return {
            category_id: categoryData.category_id
          }
        } else {
          this.addError(ERRORS.UNAUTHORIZED)
          return
        }
      } else {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.CATEGORY_NOT_EXIST)
        return
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumDeleteCategoryService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
