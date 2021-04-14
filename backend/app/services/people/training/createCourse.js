import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, uploadFileToIPFS, validateImageFile } from '../../helper'
import { addNewCourse } from '../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course: {
    presence: false
  },
  file: {
    presence: false
  },
  informationSection: {
    presence: false
  }
}

export class PeopleAddNewCourseService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let { course } = this.filteredArgs

    try {
      let url
      if (this.file) {
        const { isValidFileSize, isValidImage } = validateImageFile(course.contentSection.thumbnailImage)
        if (!isValidImage) {
          this.addError(ERRORS.BAD_DATA, MESSAGES.INVALID_IMAGE_FILE)
          return
        }

        if (!isValidFileSize) {
          this.addError(ERRORS.BAD_DATA, MESSAGES.INVALID_IMAGE_FILE_SIZE)
          return
        }

        try {
          // upload file to IPFS
          url = await uploadFileToIPFS(this.file.buffer)
        } catch (e) {
          this.addError(ERRORS.BAD_DATA, MESSAGES.IPFS_FILE_UPLOAD_ERROR)
          return
        }
      }

      course = {
        ...course,
        ...course.informationSection,
        image_url: url
      }

      const addedCourse = await addNewCourse({ course })
      // WIP - course creation
      return addedCourse
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleAddNewCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
