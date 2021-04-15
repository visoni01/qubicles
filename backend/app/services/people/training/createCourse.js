import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, uploadFileToIPFS, validateImageFile } from '../../helper'
import { addNewCourse, getCourseById, updateCourse } from '../../helper/people'

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

      if (course.courseId) {
        await updateCourse({ course })
        let courseData = await getCourseById({ course_id: course.courseId })
        courseData = {
          courseId: courseData.course_id,
          informationSection: {
            creatorId: courseData.creator_id,
            createdOn: courseData.createdAt,
            updateOn: courseData.updatedAt,
            title: courseData.title,
            categoryId: courseData.category_id,
            price: courseData.token_price,
            visibility: courseData.visibility,
            description: courseData.description,
            goals: courseData.goals,
            outcomes: courseData.outcomes,
            requirements: courseData.requirements,
            language: courseData.language
          },
          contentSection: {
            thumbnailImage: courseData.image_url,
            introductionVideo: courseData.video_url
          }
        }
        return courseData
      } else {
        let addedCourse = await addNewCourse({ course })
        addedCourse = {
          courseId: addedCourse.course_id,
          informationSection: {
            creatorId: addedCourse.creator_id,
            createdOn: addedCourse.createdAt,
            updateOn: addedCourse.updatedAt,
            title: addedCourse.title,
            categoryId: addedCourse.category_id,
            price: addedCourse.token_price,
            visibility: addedCourse.visibility,
            description: addedCourse.description,
            goals: addedCourse.goals,
            outcomes: addedCourse.outcomes,
            requirements: addedCourse.requirements,
            language: addedCourse.language
          },
          contentSection: {
            thumbnailImage: addedCourse.image_url,
            introductionVideo: addedCourse.video_url
          }
        }
        return addedCourse
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleAddNewCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
