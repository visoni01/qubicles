import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService } from '../../helper'
import { addTestEntries } from '../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course_id: {
    presence: { allowEmpty: false }
  },
  sectionId: {
    presence: { allowEmpty: false }
  },
  questions: {
    presence: { allowEmpty: false }
  }
}

export class PeopleAddTestEntriesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, course_id, sectionId: section_id, questions } = this.filteredArgs

      await addTestEntries({ user_id, course_id, section_id, questions })
    } catch (e) {
      console.error(e)
      logger.error(getErrorMessageForService('PeopleAddTestEntriesService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
