import ServiceBase from '../../../common/serviceBase'
import { getCategoryById, updateCategory } from '../../helper'
import { ERRORS, MESSAGES } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  category_id: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  is_public: {
    presence: { allowEmpty: false }
  }
}

export class ForumUpdateCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, category_id, title, is_public } = this.args
    const category = await getCategoryById({ category_id })
    if (!category) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CATEGORY_NOT_EXIST)
      return
    }

    if (category.owner_id !== user_id) {
      this.addError(ERRORS.UNAUTHORIZED)
      return
    }
    await updateCategory({
      category_id,
      title,
      is_public
    })
    return {
      category_id: category.category_id,
      title,
      is_public,
      message: 'Category updated sucessfully!!'
    }
  }
}
