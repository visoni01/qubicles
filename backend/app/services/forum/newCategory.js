import ServiceBase from '../../common/serviceBase'
import { addCategory } from '../helper'

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

export default class ForumAddNewCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { category_title, category_id } = await addCategory({
      category_title: this.title,
      owner_id: this.user_id,
      is_public: this.is_public
    })
    return ({ id: category_id, title: category_title, channels: [] })
  }
}
