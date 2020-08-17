import ServiceBase from '../../../common/serviceBase'
import { addCategory } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  is_public: {
    presence: { allowEmpty: true }
  }
}

export class ForumAddNewCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { category_title, category_id, is_public } = await addCategory({
      category_title: this.title,
      owner_id: this.user_id,
      is_public: this.is_public
    })
    return ({ id: category_id, title: category_title, channels: [], isPublic: is_public })
  }
}