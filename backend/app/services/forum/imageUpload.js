import ServiceBase from '../../common/serviceBase'
import {
  validateImageFile,
  uploadFileToIPFS
} from '../helper'
import { ERRORS, MESSAGES } from '../../utils/errors'

const constraints = {
  file: {
    presence: false
  }
}

export class ImageUploadService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      let url
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

      return { url }
    } catch (e) {
      this.addError(ERRORS.INTERNAL)
    }
  }
}
