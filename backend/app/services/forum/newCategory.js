import ServiceBase from '../../common/serviceBase'
import { addCategory } from '../helper/forum'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  isPublic: {
    presence: { allowEmpty: true }
  }
}

export default class ForumAddNewCategory extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs
    const { title, isPublic } = this.args
    const { category_title, category_id } = await addCategory({
      category_title: title,
      owner_id: user_id,
      is_public: isPublic
    })
    return ({ id: category_id, title: category_title, channels: [] })
  }
}
