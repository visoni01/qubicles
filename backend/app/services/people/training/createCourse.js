import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, uploadFileToIPFS, validateImageFile } from '../../helper'
import { addNewCourse, getCourseById, updateCourse, formatCourseData } from '../../helper/people'

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

export class PeopleAddNewCourseService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let course = JSON.parse(this.course)

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
      let courseDetails = {}
      if (course.courseId) {
        await updateCourse({ course })
        const courseData = await getCourseById({ course_id: course.courseId })

        // Format course data for reducer when updated
        if (courseData && courseData.length) {
          courseDetails = formatCourseData({ course: courseData[0] })
        }

        return { courseData: courseDetails, message: 'Course successfully updated!' }
      } else {
        const addedCourse = await addNewCourse({ course })

        // Format course data for reducer when created
        courseDetails = formatCourseData({ course: addedCourse })
        return { courseData: courseDetails, message: 'Course successfully created!' }
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleAddNewCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
