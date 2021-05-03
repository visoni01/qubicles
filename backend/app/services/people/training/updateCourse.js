import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, uploadFileToIPFS, validateImageFile } from '../../helper'
import { getCourseById, updateCourse, formatCourseData, getCategoryTitleById } from '../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course: {
    presence: { allowEmpty: false }
  },
  file: {
    presence: false
  }
}

export class PeopleUpdateCourseService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let course = JSON.parse(this.course)
    const { user_id } = this.filteredArgs

    try {
      let url = ''
      if (this.file) {
        const { isValidFileSize, isValidImage } = validateImageFile(this.file)
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
        image_url: url
      }

      await updateCourse({ course })

      const courseData = await getCourseById({ course_id: course.courseId, user_id })

      let courseDetails = {}
      // Format course data for reducer when updated
      if (courseData) {
        const categoryTitle = await getCategoryTitleById({ category_id: courseData.category_id })
        courseDetails = formatCourseData({ course: courseData, categoryTitle })
      }

      return {
        courseData: courseDetails,
        message: course.status === 'published' ? 'Course successfully published!' : 'Course successfully updated!'
      }
    } catch (e) {
      console.error(e)
      logger.error(getErrorMessageForService('PeopleUpdateCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
