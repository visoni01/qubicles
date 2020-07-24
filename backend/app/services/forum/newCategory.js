import ServiceBase from '../../common/serviceBase'
import { addCategory } from '../helper/forum'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  type: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  isPublic: {
    presence: { allowEmpty: true }
  }
}

export default class ForumCategories extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs
    const { type, title, isPublic } = this.args
    let data
    if (type === 'group') {
      data = await addCategory({
        category_title: title,
        owner_id: user_id || 1,
        is_public: isPublic
      })
      const { category_title, category_id } = data
      return ({ id: category_id, title: category_title, channels: [] })
    }
  }
}
