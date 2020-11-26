import ServiceBase from '../../common/serviceBase'
import { getAllJobCategories, getErrorMessageForService, getClientIdByUserId } from '../helper'
import logger from '../../common/logger'
import { ERRORS } from '../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  search_keyword: {
    presence: false
  }
}

export default class FetchJobCategoriesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, search_keyword } = this.filteredArgs
      const client = await getClientIdByUserId({ user_id })
      let categories
      if (client && client.client_id) {
        categories = await getAllJobCategories({ search_keyword })
      }
      return categories
    } catch (err) {
      logger.error(`${getErrorMessageForService('FetchJobCategoriesService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
